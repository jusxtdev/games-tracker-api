import express from 'express'

import { authMiddleware } from '../middleware/auth.middleware.js'
import { allGames, createGame, deleteGame, getGame, updateGame } from '../controller/game.controller.js'
import { validate } from '../middleware/validate.middleware.js'
import { gameSchema } from '../schemas/game.schema.js'

const gameRouter = express.Router()

gameRouter.use(authMiddleware)


gameRouter.post('/', validate(gameSchema.createGameSchema), createGame)

gameRouter.get('/', allGames)

gameRouter.get('/:id', getGame)

gameRouter.put('/:id', validate(gameSchema.updateGameSchema), updateGame)

gameRouter.delete('/:id', deleteGame)

export { gameRouter }