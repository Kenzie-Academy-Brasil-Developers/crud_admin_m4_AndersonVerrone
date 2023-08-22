import { Request, Response } from "express";
import { IResLogin } from "../interfaces";
import { sessionServices } from "../services";

const create = async ( req: Request, res: Response ): Promise<Response> => {
    const token: IResLogin = await sessionServices.create(req.body);

    return res.status(200).json(token);

}

export default { create };