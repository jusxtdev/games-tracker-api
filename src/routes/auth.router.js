import express from 'express'

import { validate } from '../middleware/validate.middleware.js'
import { userSchema } from '../schemas/user.schema.js'
import { createUser, loginUser, refreshUser } from '../controller/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'


const authRouter = express.Router()

authRouter.post('/register', validate(userSchema.createUserSchema), createUser)


authRouter.post('/login', validate(userSchema.loginUserSchema), loginUser)


authRouter.post('/refresh', authMiddleware, refreshUser)

export { authRouter }