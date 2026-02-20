import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { isGameCompleted } from '../middleware/isCompleted.middleware.js'
import { addReview, deleteReview, updateReview } from '../controller/review.controller.js'
import { validate } from '../middleware/validate.middleware.js'
import { reviewSchema } from '../schemas/review.schema.js'

const reviewRouter = express.Router()

reviewRouter.use(authMiddleware)

reviewRouter.post('/:id/reviews', isGameCompleted, validate(reviewSchema.addReviewSchema), addReview)

reviewRouter.put('/:id/reviews', validate(reviewSchema.updateReviewSchema), updateReview)

reviewRouter.delete('/:id/reviews', deleteReview)

export { reviewRouter }