import { userModel } from "../model/user.model.js"
import { verifyJWT } from "../utils/jwt.utils.js"

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization')

    if (!authHeader){
        res.status(401).json({
            success : false,
            msg : 'Authorization header is required'
        })
        return;
    }

    const authorization = authHeader.split(' ')

    if (authorization[0] !== 'Bearer'){
        res.status(401).json({
            success : false,
            msg : 'Invalid Auth Headers'
        })
        return;
    }

    const token = authorization[1]
    const decoded = verifyJWT(token)
    if (!decoded){
        res.status(401).json({
            success : false,
            msg : 'Invalid Token'
        })
        return
    }

    const currentUser = await userModel.findByUsername(decoded.username)
    if (!currentUser){
        res.status(404).json({
            success : false,
            msg : 'User Not found'
        })
        return;
    }

    req.user = { username : decoded.username, userId : currentUser.id }
    next()
}