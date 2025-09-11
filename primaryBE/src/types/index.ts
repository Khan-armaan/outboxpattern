import { email, z } from "zod";


export const SignupSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.email(),
    password: z.string().min(6).max(20)
})

export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20)
})