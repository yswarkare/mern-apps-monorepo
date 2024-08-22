import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MongoURI;
const jwtSecret = process.env.JWT_Secret

export { port, mongoUri, jwtSecret };
