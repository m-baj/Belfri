import Connection from "../Connection";

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
    username: string;
    authLevel: number;
} | null> {
    try {
        const result = await connection.execute(
            "SELECT USERNAME, AUTH_LEVEL, EXPIRATION FROM TOKENS JOIN USERS USING(USER_ID) WHERE TOKEN = :token",
            [token]
        );

        if (result && result.rows && result.rows.length > 0) {
            const expiration = result.rows[0][2];
            if (expiration < Date.now()) {
                //logout
                return null;
            }
            return {
                username: result.rows[0][0],
                authLevel: result.rows[0][1],
            };
        }

        return null;
    } catch (err) {
        throw err;
    }
}
