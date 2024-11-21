import { Request, Response, Router } from 'express';
import { loginUser, signUpUser } from '../controllers/user-controller';
import { authenticateToken } from '../middlewares/passport';

const router = Router();

router.post('/sign-up', async (req: Request, res: Response) => {
	try {
		await signUpUser(req, res);
	} catch (error) {
		console.log(error);
		res.status(403).json({ success: false, message: 'failed to signup' });
	}
});

router.post('/log-in', async (req: Request, res: Response) => {
	try {
		await loginUser(req, res);
	} catch (error) {
		console.log(error);
		res.status(403).json({ success: false, message: 'failed to login' });
	}
});

router.get('/user-info', authenticateToken, async (req: Request, res: Response) => {
	try {
		await loginUser(req, res);
	} catch (error) {
		console.log(error);
		res.status(403).json({ success: false, message: 'failed to get user info' });
	}
});

export default router