import 'dotenv/config'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function generateJWT(payload) {
    const token = jwt.sign(payload, JWT_SECRET, "Stack", {
        expiresIn: "24h",
    })
    return token;
}

export function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    } catch (err) {
        return false
    }
}