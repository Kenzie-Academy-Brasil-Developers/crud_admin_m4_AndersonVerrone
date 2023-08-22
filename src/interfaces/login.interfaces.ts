import { z } from "zod";
import { reqLoginSchema, resLoginSchema } from "../schemas";

type IReqLogin = z.infer<typeof reqLoginSchema>;
type IResLogin = z.infer<typeof resLoginSchema>;

export {
    IReqLogin,
    IResLogin
}