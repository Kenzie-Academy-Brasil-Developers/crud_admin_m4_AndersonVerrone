import { Router } from "express";
import { courseControllers } from "../controllers";
import { checkUserIdOrCourseId, validateToken, validatedBody } from "../middlewares";
import { courseCreateSchema } from "../schemas";

export const courseRouter: Router = Router();

courseRouter.post(
    "",
    validateToken,
    validatedBody( courseCreateSchema ),
    courseControllers.create
);

courseRouter.get(
    "",
    courseControllers.read
)

courseRouter.post(
    "/:courseId/users/:userId",
    validateToken,
    checkUserIdOrCourseId,
    courseControllers.register
)

courseRouter.get(
    "/:courseId/users",
    validateToken,
    courseControllers.readByCourse
);

courseRouter.delete(
    "/:courseId/users/:userId",
    validateToken,
    checkUserIdOrCourseId,
    courseControllers.deactivate
);