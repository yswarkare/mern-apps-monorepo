import 'dotenv/config';

export const port = process.env.PORT;

export const SECRET = process.env.SECRET!

let MongoURI: string = '';

if (typeof process.env.MongoURI === 'string') {
	MongoURI = process.env.MongoURI as string;
}

export { MongoURI };
