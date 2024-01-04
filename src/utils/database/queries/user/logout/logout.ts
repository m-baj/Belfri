import Connection from "../../../Connection";


/**
 * Removes a token from the database.
 *
 * This function takes a connection object and a token string as parameters.
 * It executes a SQL DELETE query to remove the token from the 'tokens' table in the database.
 * After the query is executed, it commits the changes to the database.
 *
 * @param {Connection} connection - The connection object to the database.
 * @param {string} token - The token to be removed from the database.
 * @returns {Promise<void>} - A Promise that resolves when the token has been successfully removed.
 */
export async function removeToken(
    connection: Connection
): Promise<void> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    await connection.execute`DELETE
                             FROM tokens
                             WHERE user_id = ${connection.getUserID()}`;
}
