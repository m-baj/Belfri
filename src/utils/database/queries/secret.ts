import Connection from "../Connection";

export async function getSecret(
    connection: Connection
): Promise<number | null> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const result = await connection.execute`SELECT SECRET_VALUE
                                            FROM TEST_TABLE
                                                     JOIN USERS USING (user_id)
                                            WHERE USER_ID = ${connection.getUserID()}
                                                FETCH NEXT 1 ROW ONLY`;

    if (result && result.rows && result.rows.length > 0) {
        return result.rows[0].secret_value;
    }

    return null;
}
