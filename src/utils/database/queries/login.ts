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
export async function getToken(connection: Connection, username: string, passHash: string): Promise<string | null> {
    try {
        const result = await connection.execute(
            "SELECT TOKEN FROM USERS JOIN TOKENS USING(USER_ID) WHERE username = :username AND pass_hash = :passHash FETCH NEXT 1 ROW ONLY", 
            [username, passHash]);
        
        if(result && result.rows && result.rows.length > 0){
            return result.rows[0][0];
        }

        return null;
    } catch (err) {
        throw err;
    }
}