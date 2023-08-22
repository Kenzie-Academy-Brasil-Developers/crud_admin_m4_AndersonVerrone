import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

export const validateToken = ( req: Request, res: Response, next: NextFunction ): void => {
    let token = req.headers.authorization;

    if (!token) {
        throw new AppError( "Missing bearer token", 401 );
    };

    try {
        token = token.split(" ")[1];
        const decoded = verify(token, process.env.SECRET_KEY!);
        res.locals.decoded = decoded;
        return next();
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }  

};