import { and, eq } from "drizzle-orm";
import { reviewsTable } from "../db/db.schema.js"
import { db } from "../db/index.js"

export const reviewModel = {
    async addReview(reviewData){
        const newReview = await db
                .insert(reviewsTable)
                .values(reviewData)
                .returning()
        return newReview;
    },

    async getReviewByGameAndUserId(gameId, userId){
        const review = await db
                .select()
                .from(reviewsTable)
                .where(
                    and(
                        eq(reviewsTable.gameId, gameId),
                        eq(reviewsTable.userId, userId)
                    )
                )

        return review[0]
    },

    async updateReview(reviewData, gameId, userId){
        const updated = await db
                .update(reviewsTable)
                .set(reviewData)
                .where(
                    and(
                        eq(reviewsTable.gameId, gameId),
                        eq(reviewsTable.userId, userId)
                    )
                )
                .returning()

        return updated;
    },

    async deleteReview(gameId, userId){
        const deleted = await db
            .delete(reviewsTable)
            .where(
                and(
                    eq(reviewsTable.gameId, gameId),
                    eq(reviewsTable.userId, userId)
                )
            )
        return deleted;
    }
}