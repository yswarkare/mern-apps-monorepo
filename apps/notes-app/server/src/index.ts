import express from 'express';
import usersRouter from './routes/users';

const app = express();

const PORT = 5000;

app.use("/api/users", usersRouter);

app.listen(PORT, ()=>{
  console.log(`running on port ${PORT}`)
})
