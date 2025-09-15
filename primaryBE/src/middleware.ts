import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "./config";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("this is the auth middleware")
    const token = req.headers.authorization as unknown as string;

    try {
        const payload = jwt.verify(token, JWT_SECRET)

        //@ts-ignore
        req.id = payload.id
        next()

    } catch (error) {
        return res.status(403).json({
            message : 'you are not logged in'
        })
    }
 


}