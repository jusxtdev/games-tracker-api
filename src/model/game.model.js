import { and, asc, desc, eq, ilike } from "drizzle-orm"
import { gamesTable, reviewsTable } from "../db/db.schema.js"
import { db } from "../db/index.js"

export const gameModel = {
    async createGame(gameData) {
        const newGame = await db
            .insert(gamesTable)
            .values(gameData)
            .returning()
        return newGame
    },

    async findGameByTitle(title) {
        const gameArr = await db
            .select()
            .from(gamesTable)
            .where(eq(gamesTable.title, title))
        return gameArr[0]
    },

    async findGameById(gameId, userId) {
        const game = await db
            .select()
            .from(gamesTable)
            .where(
                and(
                    eq(gamesTable.id, gameId),
                    eq(gamesTable.userId, userId)
                )
            )
        return game[0]
    },

    async findAllgameForUser(userId, filterParams, sortParams) {
        const { genre, status, platform } = filterParams

        // Filtering
        let conditions = [eq(gamesTable.userId, userId)]
        if (genre) {
            conditions.push(ilike(gamesTable.genre, `%${genre}%`))
        }
        if (status) {
            conditions.push(eq(gamesTable.status, status.toUpperCase()))
        }
        if (platform) {
            conditions.push(ilike(gamesTable.platform, `%${platform}%`))
        }

        // sorting and ordering
        const {sort, order} = sortParams

        /// set column for sorting
        let column;
        if (sort == 'rating'){
            column = reviewsTable.rating
        }
        if (sort == 'dateAdded'){
            column = gamesTable.addedAt
        }

        /// set order clause
        let orderClause;
        if (column){
            orderClause = order == 'desc' ? desc(column) : asc(column)
        }


        // write final query with LEFT JOIN statement
        let query = db
            .select({
                ...gamesTable,
                reviewId: reviewsTable.id,
                rating: reviewsTable.rating,
            })
            .from(gamesTable)
            .leftJoin(reviewsTable, eq(gamesTable.id, reviewsTable.gameId))
            .where(and(...conditions))
            .orderBy(orderClause ?? asc(gamesTable.title))
        

        const games = await query
        return games
    },

    async updateGameById(gameData, gameId, userId) {
        const updated = await db
            .update(gamesTable)
            .set(gameData)
            .where(
                and(
                    eq(gamesTable.id, gameId),
                    eq(gamesTable.userId, userId)
                )
            ).returning()

        return updated
    },

    async deleteGameById(gameId, userId) {
        const deleted = await db
            .delete(gamesTable)
            .where(
                and(
                    eq(gamesTable.id, gameId),
                    eq(gamesTable.userId, userId)
                )
            )
        return deleted;
    },

    async isCompleted(gameId, userId) {
        const game = await this.findGameById(gameId, userId)


        if (!game || game.status !== "COMPLETED") {
            return false
        }

        return true;
    },
}