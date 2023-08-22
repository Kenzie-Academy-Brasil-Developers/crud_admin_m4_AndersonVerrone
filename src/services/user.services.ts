import { hash } from "bcryptjs";
import { IUserCreate, IUserRead, IUserResult, IUserReturn } from "../interfaces";
import format from "pg-format";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas";
import { AppError } from "../errors";

const create = async ( payload: IUserCreate ): Promise<IUserReturn> => {
    payload.password = await hash( payload.password, 10 );

    const queryString: string = 'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;';

    const queryFormat: string = format(
        queryString,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: IUserResult = await client.query(queryFormat);

    const newUser = queryResult.rows[0];

    return userReturnSchema.parse(newUser);
};

const read = async ( admin: boolean ): Promise<IUserRead> => {
    if ( !admin ) {
        throw new AppError( "Insufficient permission", 403 );
    };

    const queryString: string = 'SELECT * FROM "users";';

    const queryResult: IUserResult = await client.query( queryString );

    const users = queryResult.rows;

    const userReturn = userReadSchema.parse(users);

    return userReturn;
};

const readCoursesByUser = async ( userId: string, admin: boolean ) => {

    if ( !admin ) {
        throw new AppError( "Insufficient permission", 403 );
    };

    const queryString: string = `
        SELECT
            c.id "courseId",
            c.name "courseName",
            c.description "courseDescription",
            uc.active "userActiveInCourse",
            u.id "userId",
            u.name "userName"
        FROM "users" u
        JOIN "userCourses" uc
            ON u.id = uc."userId"
        JOIN "courses" c
            ON c.id = uc."courseId"
        WHERE u.id = $1;
    `;

    const queryResult = await client.query( queryString, [ userId ] );

    if ( !queryResult.rowCount ) {
        throw new AppError("No course found", 404);
    };

    return queryResult.rows
}

export default { create, read, readCoursesByUser }