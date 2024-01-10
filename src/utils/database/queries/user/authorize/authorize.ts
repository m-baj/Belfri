import Connection from "../../../Connection";

/**
 * The function `getUserAuth` retrieves the username and authentication level of a user based on a
 * token from a database connection.
 * @param {Connection} connection - The `connection` parameter is an object that represents a
 * connection to a database. It is used to execute SQL queries and retrieve results from the database.
 * @param {string} token - The `token` parameter is a string that represents a user authentication
 * token. It is used to identify and authenticate the user making the request.
 * @returns The `getUserAuth` function returns a Promise that resolves to an object with the properties
 * `username` (string) and `authLevel` (number), or `null` if no matching token is found.
 */
export async function getUserAuth(
    connection: Connection,
    token: string
): Promise<{
    user_id: string;
    authLevel: number;
}> {
    const result = await connection.execute`SELECT USER_ID, AUTH_LEVEL, EXPIRATION
                                            FROM TOKENS
                                                     JOIN USERS USING (USER_ID)
                                            WHERE TOKEN = ${token}`;
    if (result && result.rows && result.rows.length > 0) {
        const expiration = result.rows[0].expiration;
        if (expiration < Date.now()) {
            await connection.execute`DELETE
                                     FROM TOKENS
                                     WHERE TOKEN = ${token}`;
            throw new Error("Token expired");
        }
        return {
            user_id: result.rows[0].user_id,
            authLevel: result.rows[0].auth_level
        };
    }

    throw new Error("Invalid token");
}
