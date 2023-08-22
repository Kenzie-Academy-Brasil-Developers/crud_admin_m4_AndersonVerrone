import { z } from "zod";

const reqLoginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(4).max(120).nonempty(),
});

const resLoginSchema = z.object({
    token: z.string(),
})

export { reqLoginSchema, resLoginSchema }