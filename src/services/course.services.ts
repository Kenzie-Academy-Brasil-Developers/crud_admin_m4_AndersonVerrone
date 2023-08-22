import format from "pg-format";
import { ICourse, ICourseCreate, ICourseRead, ICourseResult, IUserCourseResult } from "../interfaces";
import { client } from "../database";
import { courseReadSchema, courseSchema, userCoursesSchema } from "../schemas";
import { AppError } from "../errors";

const create = async ( payload: ICourseCreate, admin: boolean ): Promise<ICourse> => {
    if ( !admin ) {
        throw new AppError( "Insufficient permission", 403 );
    };
    
    const queryString: string = 'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;';
    
    const queryFormat: string = format(
        queryString,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: ICourseResult = await client.query(queryFormat);

    const newCourse = queryResult.rows[0];

    return courseSchema.parse(newCourse);
};

const read = async (): Promise<ICourseRead> => {
    const queryString: string = 'SELECT * FROM "courses";';

    const queryResult: ICourseResult = await client.query( queryString );

    const courses = queryResult.rows;

    const coursesReturn = courseReadSchema.parse(courses);

    return coursesReturn;
};

const register = async ( admin: boolean, courseId: string, userId: string ): Promise<{message: string}> => {
    if ( !admin ) {
        throw new AppError( "Insufficient permission", 403 );
    };

    const payload = {
        userId: userId,
        courseId: courseId
    }

    const queryString: string = 'INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *;';

    const queryFormat: string = format(
        queryString,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: IUserCourseResult = await client.query(queryFormat);

    const newRegister = queryResult.rows[0];

    return {"message": "User successfully vinculed to course"}
}

const readByCourse = async ( admin: boolean, courseId: string ) => {
    if ( !admin ) {
        throw new AppError( "Insufficient permission", 403 );
    };

    const queryString: string = `
        SELECT
            u.id "userId",
            u.name "userName",
            c.id "courseId",
            c.name "courseName",
            c.description "courseDescription",
            uc.active "userActiveInCourse"
        FROM "courses" c
        JOIN "userCourses" uc
            ON c.id = uc."courseId"
        JOIN "users" u
            ON u.id = uc."userId"
        WHERE c.id = $1;
    `;

    const queryResult = await client.query( queryString, [ courseId ] );

    if ( !queryResult.rowCount ) {
        throw new AppError("No course found", 404);
    };

    return queryResult.rows;
}

const deactivate = async ( admin: boolean, courseId: string, userId: string ): Promise<void> => {
    if ( !admin ) {
        throw new AppError( "Insufficient permission", 403 );
    };

    const queryString: string = `
        UPDATE "userCourses"
        SET "active" = false
        WHERE "userId" = $1
        AND "courseId" = $2;
    `;

    await client.query( queryString, [ userId, courseId ] );
}

export default { create, read, register, readByCourse, deactivate };