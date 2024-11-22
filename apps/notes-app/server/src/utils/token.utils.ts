import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserEntity } from '../db/user.dto';

export const createToken = (user: UserEntity) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
			email: user.email,
		},
		SECRET,
		{ expiresIn: '1 day' }
	);
  
	return {
		bearerToken: `Bearer ${token}`,
    token,
		expiresIn: '24 hr',
	};
};

export const verifyToken = (token: string) => {
	try {
		let bigToken;
		if (token.includes(' ')) {
			bigToken = token.split(' ');
			token = bigToken[1];
		}
		const decoded = jwt.verify(token, SECRET, { complete: true });
		return { success: true, message: 'Token verified', decoded };
	} catch (err) {
		return { success: false, message: 'Failed to verify token', error: `${err}` };
	}
};

export const jwtAuth = (token: string) => {
	try {
		let bigToken;
		if (token.includes(' ')) {
			bigToken = token.split(' ');
			token = bigToken[1];
		}
		const decoded = jwt.verify(token, SECRET, { complete: true });
		if (decoded) {
			return true;
		}
		return false;
	} catch (err) {
		return false;
	}
};
