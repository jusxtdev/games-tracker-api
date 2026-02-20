import { gameModel } from "../model/game.model.js"


// filters = genre, status, platform
export const allGames = async (req, res) => {
    const userId = req.user.userId
    const {genre, status, platform, sort, order} = req.query
    const filterParams = {genre, status, platform}
    const sortParams = {sort, order}
    
        
    const games = await gameModel.findAllgameForUser(userId, filterParams, sortParams)

    res.status(200).json({
        success : true,
        msg : 'All games fetched successfully',
        games
    })
}

export const createGame = async (req, res) => {
    const gameData = req.body

    // check if same game exists by title
    const existing = await gameModel.findGameByTitle(gameData.title)
    if (existing){
        res.status(409).json({
            success : false,
            msg : 'Game Title Already Exists'
        })
        return;
    }

    // add a userId to gameData
    gameData.userId = req.user.userId

    // create new game
    const newGame = await gameModel.createGame(gameData)
    res.status(201).json({
        success : true,
        msg : 'Game Added Successfully',
        newGame : newGame
    })

}

export const getGame = async (req, res) => {
    const userId = req.user.userId
    const gameId = req.params.id

    const game = await gameModel.findGameById(gameId, userId)

    if (!game){
        res.status(404).json({
            success : false,
            msg : 'Game Not Found'
        })
        return;
    }

    res.status(200).json({
        success : true,
        msg : 'Game Fetched successfully',
        game
    })
}

export const updateGame = async (req, res) => {
    const userId = req.user.userId
    const gameId = req.params.id
    const gameData = req.body

    const updated = await gameModel.updateGameById(gameData, gameId, userId)
    res.status(200).json({
        success : true,
        msg : 'Game Updated Successfully',
        updated
    })
}

export const deleteGame = async (req, res) => {
    const userId = req.user.userId
    const gameId = req.params.id

    const deleted = await gameModel.deleteGameById(gameId, userId)
    res.status(200).json({
        success : true,
        msg : 'Game Deleted Successfully'
    })
}