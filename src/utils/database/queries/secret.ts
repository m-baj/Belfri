import Connection from "../Connection";

export async function getSecret(
    connection: Connection
): Promise<number | null> {
    if (!connection.isAuthorized()) {
        return null;
    }
    const result = await connection.execute(
        "SELECT SECRET_VALUE FROM TEST_TABLE JOIN USERS USING(USER_ID) WHERE USERNAME = :username FETCH NEXT 1 ROW ONLY",
        [connection.getUsername()]
    );

    if (result && result.rows && result.rows.length > 0) {
        return result.rows[0][0];
    }

    return null;
}
