import { NextFunction, Request, Response } from "express";
import { ICourseResult, IUserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const checkUserIdOrCourseId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { userId, courseId } = req.params;

    const queryStringUser: string = 'SELECT * FROM "users" WHERE "id" = $1';

    const queryStringCourse: string = 'SELECT * FROM "courses" WHERE "id" = $1';

    const queryResultUser: IUserResult = await client.query( queryStringUser, [ userId ] );

    const queryResultCourse: ICourseResult = await client.query( queryStringCourse, [ courseId ] );

    if ( queryResultUser.rows.length === 0 || queryResultCourse.rows.length === 0 ) {
        throw new AppError( "User/course not found", 404 );
    }

    return next();
}