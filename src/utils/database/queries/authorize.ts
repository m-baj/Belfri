import Connection from "../Connection";

export async function getUserAuth(
    connection: Connection,
    token: string
): Promise<{
    username: string;
    authLevel: number;
} | null> {
    try {
        const result = await connection.execute(
            "SELECT USERNAME, AUTH_LEVEL FROM TOKENS JOIN USERS USING(USER_ID) WHERE TOKEN = :token",
            [token]
        );

        if (result && result.rows && result.rows.length > 0) {
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
