import { avg, count, desc, eq } from "drizzle-orm"
import { gamesTable, reviewsTable } from "../db/db.schema.js"
import { db } from "../db/index.js"

export const statsModel = {
    async getGamesCount(userId) {
        const allGamesCount = await db
            .select({ total_games: count() })
            .from(gamesTable)
            .where(eq(gamesTable.userId, userId))

        return allGamesCount[0]
    },

    async getStatusCounts(userId) {
        const statusCounts = await db
            .select({
                status: gamesTable.status,
                count: count()
            })
            .from(gamesTable)
            .groupBy(gamesTable.status)
            .where(eq(gamesTable.userId, userId))

        return statusCounts;

    },

    async getReviewCount(userId) {
        const reviewCount = await db
            .select({ total_reviews: count() })
            .from(reviewsTable)
            .where(eq(reviewsTable.userId, userId))

        return reviewCount[0];
    },

    async getAvgRating(userId) {
        const avgRating = await db
            .select({ avgRating: avg(reviewsTable.rating) })
            .from(reviewsTable)
            .where(eq(reviewsTable.userId, userId))

        const avgValue = avgRating[0]?.avgRating
        if (avgValue === null || avgValue === undefined) {
            return 0
        }
        return Number(avgValue)
    },

    async getThisYear(userId) {
        const allgames = await db
            .select({
                title: gamesTable.title,
                addedAt: gamesTable.addedAt,
                status : gamesTable.status
            })
            .from(gamesTable)
            .where(eq(gamesTable.userId, userId))

        const gamesThisYear = {
            gamesAdded : 0,
            games_completed : 0
        }
        allgames.map((game) => {
            const addedAt = new Date(game.addedAt)
            const addedAtYear = addedAt.getUTCFullYear();

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();

            if (addedAtYear == currentYear){
                gamesThisYear.gamesAdded++
                if (game.status == "COMPLETED"){
                    gamesThisYear.games_completed++
                }
            } 
        })
        return gamesThisYear;
    },

    async getTopGames(userId){
        const allGamesSorted = await db
                .select({
                    id : gamesTable.id,
                    title : gamesTable.title,
                    rating : reviewsTable.rating,
                    genre : gamesTable.genre,
                    addedAt : gamesTable.addedAt,
                })
                .from(gamesTable)
                .innerJoin(reviewsTable, eq(gamesTable.id, reviewsTable.gameId))
                .where(eq(gamesTable.userId, userId))
                .orderBy(desc(reviewsTable.rating))
        
        for (let game of allGamesSorted){
            const gameAddedAt = new Date(game.addedAt)
            const gameAddedDate = gameAddedAt.toISOString().split('T')[0]
            game.addedAt = gameAddedDate
        }

        return allGamesSorted.slice(0,5);
    },
}
