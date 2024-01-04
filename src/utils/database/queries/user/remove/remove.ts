import Connection from "@/utils/database/Connection";

/**
 * This function is used to remove a user from the database.
 * @param {Connection} connection - The connection object to the database.
 * @throws {Error} Will throw an error if the connection is not authorized.
 * @returns {Promise<void>} Returns a promise that resolves to void.
 */
export async function removeUser(
    connection: Connection
): Promise<void> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    // remove the email, password and username from the database
    await connection.execute`
        UPDATE USERS
        SET EMAIL      = NULL,
            PASS_HASH  = NULL,
            USERNAME   = NULL,
            AUTH_LEVEL = 0,
            activated  = 0
        WHERE USER_ID = ${connection.getUserID()}`;
}