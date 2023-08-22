import { z } from "zod";
import { userCoursesSchema } from "../schemas";
import { QueryResult } from "pg";

type IUserCourse = z.infer<typeof userCoursesSchema>;
type IUserCourseResult = QueryResult<IUserCourse>;

export {
    IUserCourse,
    IUserCourseResult
}