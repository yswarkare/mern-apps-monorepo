import { Request, Response } from 'express';
import { CreateUserDto, UserEntity } from '../db/user.dto';
import { validateCreateUserDto, validateUserDto } from '../utils/user.utils';
import { createNewUser, doesUserExists, getUserByEmail, getUserByUsername, getUserByUsernameOrEmailOrMobile } from '../helpers/user.helper';
import { comparePassword, hashPassword } from '../utils/bcryptjs';
import { createToken } from '../utils/token.utils';

export const signUpUser = async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
	try {
		const user: CreateUserDto = req.body;

		/* trim user fields */
		for (const key in user) {
			user[key] = user[key].trim();
		}
		/* validate user */
		const { isValid, errors } = validateCreateUserDto(user);
		if (!isValid) return res.status(401).json({ success: false, message: errors });

		/* check if user already exists */
		const result = await doesUserExists(user);
		if (result) return res.status(401).json({ success: false, message: `user already exists.` });

		/* Hash password using bcryptjs. */
		let { success, message, hashed } = await hashPassword(user.password);
		if (success === false) {
			return res.status(401).json({ success, message });
		}
		if (hashed) user.password = hashed;

		/* create new user */
		const newUser = await createNewUser(user);

		/* create jwt token */
		const tokenInfo = createToken(newUser);

		res.setHeader('Authorization', tokenInfo.bearerToken);
		res.cookie('bearerToken', tokenInfo.bearerToken);

		/* return response */
		if (newUser) {
			return res.status(200).json({ success: true, message: 'user created successfully!' });
		} else {
			return res.status(400).json({ success: false, message: 'error occurred! failed to create user' });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({ success: false, message: 'error occurred', error });
	}
};

export const loginUser = async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
	try {
		const user: CreateUserDto = req.body;
		/* trim user fields */
		for (const key in user) {
			user[key] = user[key].trim();
		}

		/* validate user */
		const { isValid, errors } = validateUserDto(user);
		if (!isValid) return res.status(401).json({ success: false, message: errors });

		/* get user */
		let userInfo: UserEntity;
		try {			
			if (user?.email) {
				userInfo = await getUserByEmail(user.email);
			} else if (user?.username) {
				userInfo = await getUserByUsernameOrEmailOrMobile(user.username);
			}
		} catch (error) {
			console.log(error)
			return res.status(401).json({ success: false, message: `user doesn't exists.` });
		}

		if (userInfo! && typeof userInfo != 'boolean' && userInfo?.password) {
			/* compare password using bcryptjs. */
			let { success, message } = await comparePassword(user.password, userInfo.password);
			if (success === false) {
				return res.status(403).json({ success, message });
			}
		}

		/* create jwt token */
		const tokenInfo = createToken(userInfo!);

		res.setHeader('Authorization', tokenInfo.bearerToken);
		res.cookie('bearerToken', tokenInfo.bearerToken);

		/* return response */
		if (tokenInfo?.token) {
			return res.status(200).json({ success: true, message: 'user logged in successfully!' });
		} else {
			return res.status(400).json({ success: false, message: 'error occurred! failed to log in user' });
		}
	} catch (error) {
		return res.status(400).json({ success: false, message: 'error occurred', error });
	}
};

export const getUserInfo = async (req: Request, res: Response) => {
	try {
		console.log(req.user);
	} catch (error) {}
};
