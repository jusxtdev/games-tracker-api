import { z } from 'zod'

export const userSchema = {
    createUserSchema: z.object({
        username: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(4),
    }),

    loginUserSchema : z.object({
        username : z.string().min(2),
        password : z.string().min(4)
    })
}