import { gameModel } from "../model/game.model.js"
import { reviewModel } from "../model/review.model.js"

export const addReview = async (req, res) => {
    const gameId = req.params.id
    const userId = req.user.userId
    const reviewData = req.body

    const game = await gameModel.findGameById(gameId, userId)

    if (!game){
        res.status(404).json({
            success : false,
            msg : 'Game Not Found'
        })
        return;
    }

    const newReviewData = {...reviewData, gameId, userId}
    const newReview = await reviewModel.addReview(newReviewData)
    res.status(201).json({
        success : true,
        msg : 'Review Added successfully',
        newReview
    })

}

export const updateReview = async (req, res) => {
    const gameId = req.params.id
    const userId = req.user.userId
    
    // check if review exists
    const exists = await reviewModel.getReviewByGameAndUserId(gameId, userId)
    if (!exists){
        res.status(404).json({
            success : false,
            msg : 'Game Not found'
        })
        return;
    }

    const updateData = req.body
    const updated = await reviewModel.updateReview(updateData, gameId, userId)
    res.status(200).json({
        success : true,
        msg : 'Updated Review Successfully',
        updated
    })
}

export const deleteReview = async (req, res) => {
    const gameId = req.params.id
    const userId = req.user.userId
    
    // check if review exists
    const exists = await reviewModel.getReviewByGameAndUserId(gameId, userId)
    if (!exists){
        res.status(404).json({
            success : false,
            msg : 'Game Not found'
        })
        return;
    }

    const deleted = await reviewModel.deleteReview(gameId, userId)

    res.status(200).json({
        success : true,
        msg : 'Review Deleted Successfully'
    })
}