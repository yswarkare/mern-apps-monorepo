import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { jwtSecret } from '../config/index.js';

/** register user */

export const register = async (req, res) => {
	try {
		const { firstname, lastname, email, password, picturePath, friends, location, occupation } = req.body;

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstname,
			lastname,
			email,
			passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});
		const savedUser = await newUser.save();

		res.status(201).json({ user: savedUser, message: 'user created successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error, message: error.message });
	}
};

/** logging in */

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });

		if (!user) return res.status(400).json({ message: `user doesn't exists.` });

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return res.status(400).json({ message: `invalid password` });

		const token = jwt.sign({ id: user._id }, jwtSecret);
		delete user.password;
		res.status(200).json({ token, user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error, message: error.message });
	}
};
