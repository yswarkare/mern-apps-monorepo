import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/index.js';

export const verifyToken = async (req, res, next) => {
	try {
		let token = req.header('Authorization');
		if (!token) {
			return res.status(403).send('Access Denied');
		}
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		}

		const verified = jwt.verify(token, jwtSecret);
		req.user = verified;
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};
