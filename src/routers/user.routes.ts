import { Router } from "express";
import { userControllers } from "../controllers";
import { checkEmailExists, checkUserHasCourse, validateToken, validatedBody } from "../middlewares";
import { userCreateSchema } from "../schemas";

export const userRouter: Router = Router();

userRouter.post(
    "",
    validatedBody( userCreateSchema ),
    checkEmailExists,
    userControllers.create
);

userRouter.get(
    "",
    validateToken,
    userControllers.read
);

userRouter.get(
    "/:userId/courses",
    validateToken,
    checkUserHasCourse,
    userControllers.readCoursesByUser
)