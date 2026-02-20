import { gameModel } from "../model/game.model.js"

export async function isGameCompleted(req, res, next) {
    const gameId = req.params.id
    const userId = req.user.userId

    const isCompleted = await gameModel.isCompleted(gameId, userId)

    if (!isCompleted){
        res.status(403).json({
            success : false,
            msg : 'Game isn\'t completed yet'
        })
        return;
    }
    next()
}