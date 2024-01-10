import Connection from "@/utils/database/Connection";

export async function claimCredits(connection: Connection, token: string) {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    // check if token exists
    const result = await connection.execute`SELECT *
                                            FROM credits_tokens
                                            WHERE token = ${token}
                                                FETCH NEXT 1 ROW ONLY`;

    if (!result || !result.rows || result.rows.length == 0) {
        throw new Error("Invalid token");
    }

    connection.execute`UPDATE users
                       SET credits_id = (SELECT credits_id FROM credits_tokens WHERE token = ${token})
                       WHERE user_id = ${connection.getUserID()}`;

    connection.execute`DELETE
                       FROM credits_tokens
                       WHERE token = ${token}`;
}