import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleErrors = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if ( err instanceof AppError ) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    };

    if ( err instanceof JsonWebTokenError ) {
        return res.status(401).json({ error: err.message });
    };

    if ( err instanceof ZodError ) {
        return res.status(400).json( err.flatten().fieldErrors );
    };

    console.log( err );

    return res.status(500).json({
        message: "Internal Server Error",
    });
};