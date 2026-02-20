import {z} from 'zod'

export const reviewSchema = {
    addReviewSchema : z.object({
        rating : z.number().int().min(1).max(10),
        review_text : z.string(),
    }),

    updateReviewSchema : z.object({
        rating : z.number().int().min(1).max(10).optional(),
        review_text : z.string().optional(),
    }),
}