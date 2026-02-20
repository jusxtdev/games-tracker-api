import { statsModel } from "../model/stats.model.js"

export const statsController = async (req, res) => {
    const userId = req.user.userId

    const overview = await getOverview(userId)
    const reviewStats = await getReviewStats(userId)
    const thisYear = await getThisYear(userId)
    const topGames = await getTopGames(userId)
    

    const result = { overview, reviewStats, thisYear, topGames }

    res.status(200).json({
        success: true,
        msg: 'Game Overview',
        result
    })
}

async function getOverview(userId) {
    const gamesCount = await statsModel.getGamesCount(userId)
    const statusCounts = await statsModel.getStatusCounts(userId)

    const overview = {
        total_games: gamesCount.total_games
    }

    statusCounts.map((status) => overview[status.status] = status.count)

    const statusEnum = ["PLAYING", "COMPLETED", "DROPPED", "WANT", "ONHOLD"]
    for (let statusTitle of statusEnum) {
        if (!overview[statusTitle]) {
            overview[statusTitle] = null
        }
    }
    return overview
}

async function getReviewStats(userId) {
    const reviewCount = await statsModel.getReviewCount(userId)
    const avgRating = await statsModel.getAvgRating(userId)
    const result = {
        total_reviews : reviewCount.total_reviews,
        average_rating : avgRating.toFixed(2)
    }
    return result;
}

async function getThisYear(userId) {
    const yearlyStats = await statsModel.getThisYear(userId)
    return yearlyStats
}

async function getTopGames(userId) {
    const topGames = await statsModel.getTopGames(userId)
    return topGames
}
