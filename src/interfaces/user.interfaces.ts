import { z } from "zod";
import { userCreateSchema, userReadSchema, userReturnSchema, userSchema } from "../schemas";
import { QueryResult } from "pg";

type IUser = z.infer<typeof userSchema>;
type IUserCreate = z.infer<typeof userCreateSchema>;
type IUserRead = z.infer<typeof userReadSchema>;
type IUserReturn = z.infer<typeof userReturnSchema>;
type IUserResult = QueryResult<IUser>;

export {
    IUser,
    IUserCreate,
    IUserRead,
    IUserReturn,
    IUserResult
}