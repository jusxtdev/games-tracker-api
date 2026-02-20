import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { statsController } from '../controller/stat.controller.js'

const statsRouter = express.Router()

statsRouter.get('/', authMiddleware, statsController)

export { statsRouter }