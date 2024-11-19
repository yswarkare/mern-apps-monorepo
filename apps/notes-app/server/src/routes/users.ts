import { NextFunction, Request, Response, Router } from "express";

const router = Router()

router.get("/api/users", (request: Request, response: Response, next: NextFunction) => {
  response.send({message: 'hello users'})
  next() .
}) 

export default router