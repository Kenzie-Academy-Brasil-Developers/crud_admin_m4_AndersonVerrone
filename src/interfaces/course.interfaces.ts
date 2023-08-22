import { z } from "zod";
import { courseCreateSchema, courseReadSchema, courseSchema } from "../schemas";
import { QueryResult } from "pg";

type ICourse = z.infer<typeof courseSchema>;
type ICourseCreate = z.infer<typeof courseCreateSchema>;
type ICourseRead = z.infer<typeof courseReadSchema>;
type ICourseResult = QueryResult<ICourse>;

export {
    ICourse,
    ICourseCreate,
    ICourseRead,
    ICourseResult
}