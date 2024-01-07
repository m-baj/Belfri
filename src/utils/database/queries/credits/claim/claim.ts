import Connection from "@/utils/database/Connection";

export async function claimCredits(connection: Connection, token: string) {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    await connection.execute`UPDATE users
                             SET credits_id = (SELECT credits_id FROM credits_tokens WHERE token = ${token})
                             WHERE user_id = ${connection.getUserID()}`;

    await connection.execute`DELETE
                             FROM credits_tokens
                             WHERE token = ${token}`;
}