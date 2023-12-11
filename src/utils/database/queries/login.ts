import generateToken from "@/utils/etc/generateToken";
import Connection from "../Connection";

/**
 * The function `getToken` retrieves a token from the database for a given username and password hash.
 * @param {Connection} connection - The `connection` parameter is an object representing a database
 * connection. It is used to execute SQL queries and interact with the database.
 * @param {string} username - The `username` parameter is a string that represents the username of the
 * user for whom you want to retrieve the token.
 * @param {string} passHash - The `passHash` parameter is a string that represents the hashed password
 * of a user. It is used to compare against the stored password hash in the database to authenticate
 * the user.
 * @returns The function `getToken` returns a Promise that resolves to a string or null.
 * If the user is authenticated, the function returns a string that represents the token of the user.
 * If the user is not authenticated, the function returns null.
 */
export async function getToken(
    connection: Connection,
    username: string,
    passHash: string
): Promise<string | null> {
    try {
        // check if user exists and password is correct
        const result = await connection.execute(
            "SELECT USER_ID FROM USERS WHERE USERNAME = :username AND PASS_HASH = :passHash",
            [username, passHash]
        );

        if (!result || !result.rows || result.rows.length === 0) {
            return null;
        }

        const userId = result.rows[0][0];

        // remove old token
        await connection.execute("DELETE FROM TOKENS WHERE USER_ID = :userId", [
            userId,
        ]);

        const token = generateToken();

        // date in format 2023-12-04 22:15:32.000000
        const date = new Date(Date.now() + 30 * 60 * 1000);
        // insert new token
        await connection.execute(
            "INSERT INTO TOKENS (TOKEN, USER_ID, EXPIRATION) VALUES (:token, :userId, :expiration)",
            [token, userId, date]
        );

        await connection.commit();

        return token;
    } catch (err) {
        throw err;
    }
}
