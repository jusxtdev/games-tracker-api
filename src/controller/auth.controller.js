import { userModel } from "../model/user.model.js"
import { hashPassword, verifyPassword } from "../utils/common.utils.js"
import { generateJWT } from "../utils/jwt.utils.js"

export const createUser = async (req, res) => {
    /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Register a new user'
    */
    const { username, email, password } = req.body

    // check if user exists
    const userExists = await userModel.findByUsername(username)
    if (userExists) {
        res.status(409).json({
            success: false,
            msg: 'Username already exists'
        })
        return
    }

    // hash password
    const hashPass = await hashPassword(password)

    // create User
    const newUser = { username, email, hashPass }
    const created = await userModel.createUser(newUser)
    res.status(201).json({
        success: true,
        msg: 'User Successfully created',
        newUser: created
    })
}

export const loginUser = async (req, res) => {
    /*  
      #swagger.tags = ['Authentication']
      #swagger.description = 'User Login'
    */
    const { username, password } = req.body

    // checkif user exists
    const userExists = await userModel.findByUsername(username)
    if (!userExists) {
        res.status(404).json({
            success: false,
            msg: 'Username Not found'
        })
        return
    }

    // verify password
    const existingPass = userExists.hashPass
    const validPass = await verifyPassword(password, existingPass)
    if (!validPass) {
        res.status(401).json({
            success: false,
            msg: 'Incorrect Password'
        })
        return;
    }

    // generate JWT
    const token = generateJWT({ username })

    // return token
    res.status(200).json({
        success: true,
        msg: 'Logged in Successfully',
        token: token
    })
}

export const refreshUser = async (req, res) => {
    /*  
      #swagger.tags = ['Authentication']
      #swagger.description = 'Refresh Token'
    */
    const username = req.user.username

    const token = generateJWT({ username })
    res.status(200).json({
        success: true,
        msg: 'New token generated Successfully',
        token: token
    })
}