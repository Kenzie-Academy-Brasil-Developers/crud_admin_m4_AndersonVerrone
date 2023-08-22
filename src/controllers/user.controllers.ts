import { Request, Response } from "express";
import { IUserCreate, IUserRead, IUserReturn } from "../interfaces";
import { userServices } from "../services";
import { boolean } from "zod";

const create = async ( req: Request, res: Response ): Promise<Response> => {
    const userBody: IUserCreate = req.body
    const user: IUserReturn = await userServices.create( userBody );
    return res.status(201).json(user);
};

const read = async ( req: Request, res: Response ): Promise<Response> => {
    const { admin } = res.locals.decoded;

    const users: IUserRead = await userServices.read( admin );

    return res.status(200).json( users );
};

const readCoursesByUser = async ( req: Request, res: Response ): Promise<Response> => {
    const { userId } = req.params;
    const { admin } = res.locals.decoded;

    const coursesByUser = await userServices.readCoursesByUser( userId, admin );

    return res.status(200).json(coursesByUser);
};

export default {
    create,
    read,
    readCoursesByUser
}