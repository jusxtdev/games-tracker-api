import express from 'express'
import { authRouter } from './auth.router.js'
import { gameRouter } from './game.router.js'
import { reviewRouter } from './review.router.js'
import { statsRouter } from './stats.router.js'

const rootRouter = express.Router()

rootRouter.get('/', (req, res) => {
    res.status(200).json({msg : 'Game Tracker API'})
})

rootRouter.use('/auth', authRouter)
rootRouter.use('/games', gameRouter)
rootRouter.use('/games', reviewRouter)
rootRouter.use('/stats', statsRouter)

export { rootRouter }