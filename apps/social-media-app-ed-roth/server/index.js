import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { port, mongoUri } from './config/index.js';
import http from 'http';
import authRoutes from './routes/auth.js'
import { register } from './controllers/auth.js';

/* configurations */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors);
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* file storage */

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/assets');
	},
	filename: function (req, file, cb) {
		cb(null, file.orginalname);
	},
});

const upload = multer({ storage });

/** routes with files */

app.post('/auth/register', upload.single('picture'), register);


/* routes */

app.use("/auth", authRoutes);



/* mongoose setup */

async function connectToDB() {
	try {
		const connection = await mongoose.connect(mongoUri);
		console.log('connected to MongoDB');
		return connection;
	} catch (error) {
		console.log('failed to connect to MongoDB');
		console.error(error);
		throw error;
	}
}

/** start server */

async function startServer() {
	try {
		await connectToDB();
		const server = http.createServer(app);
		server.listen(port, () => {
			console.log(`server started on port ${port}`);
		});
	} catch (error) {
		console.log(`failed to start server`);
		console.error(error);
	}
}

startServer();
