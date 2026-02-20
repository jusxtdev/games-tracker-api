import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10;

export async function hashPassword(password){
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPass
}

export async function verifyPassword(password, existingPass) {
    const isPassValid = await bcrypt.compare(password, existingPass)
    if (!isPassValid) return false
    return true;
}