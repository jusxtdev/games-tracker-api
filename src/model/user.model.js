import { eq } from "drizzle-orm";
import { db } from "../db/index.js"
import { usersTable } from "../db/db.schema.js"


const userModel = {
    async createUser({ username, email, hashPass }) {
        const newUser = await db
            .insert(usersTable)
            .values({username, email, hashPass})
            .returning()

        return newUser;
    },

    async findByUsername(username){
        const user = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.username, username))
        
        return user[0];
    }
}

export { userModel }