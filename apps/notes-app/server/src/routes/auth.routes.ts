import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middlewares/passport';
import { verifyToken } from '../utils/token.utils';

const router = Router();

router.post('/authenticate-token', authenticateToken, async function (req: Request, res: Response) {
	try {
		const result = req.user;
		console.log({ result });
		res.status(200).json({ success: true, message: 'token successfully authenticated' });
	} catch (error) {
		console.log({ error });
		res.status(403).json({ success: false, message: 'Failed to authenticate the token.', error });
	}
});

router.post('/verify-token', async function (req: Request, res: Response) {
	try {
		const token: string = req.cookies.bearerToken;
		const { success, decoded } = verifyToken(token);
		console.log({ success, decoded });
		if (success) {
			res.status(200).json({ success: true, message: 'token successfully authenticated' });
		} else {
			res.status(403).json({ success: false, message: 'user token is not authenticated or expired.' });
		}
	} catch (error) {
		console.log({ error });
		res.status(403).json({ success: false, message: 'Failed to authenticate the token.', error });
	}
});

router.post('/log-out', async function (req: Request, res: Response) {
	try {
		const token: string = req.cookies.bearerToken;
		const { success, decoded } = verifyToken(token);
		console.log({ success, decoded });

		const tokenInfo = {
			bearerToken: ''
		}

		res.setHeader('Authorization', tokenInfo.bearerToken);
		res.cookie('bearerToken', tokenInfo.bearerToken);

		res.status(200).json({ success: true, message: 'user logged out successfully' });
	} catch (error) {
		console.log({ error });
		res.status(403).json({ success: false, message: 'Failed to authenticate the token.', error });
	}
});

export default router;
