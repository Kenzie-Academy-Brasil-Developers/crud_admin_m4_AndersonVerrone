import { Router } from "express";
import { validatedBody } from "../middlewares";
import { reqLoginSchema } from "../schemas";
import { sessionControllers } from "../controllers";

export const sessionRouter: Router = Router();

sessionRouter.post(
    "",
    validatedBody(reqLoginSchema),
    sessionControllers.create
)

