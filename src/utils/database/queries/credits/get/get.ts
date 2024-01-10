import Connection from "@/utils/database/Connection";

export async function getCredits(connection: Connection): Promise<number> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    // get current user's credits
    const result = await connection.execute`SELECT current_value
                                            FROM CREDITS
                                                     JOIN users USING (credits_id)
                                            WHERE user_id = ${connection.getUserID()}
                                                FETCH NEXT 1 ROW ONLY`;

    if (!result || !result.rows || result.rows.length == 0) {
        throw new Error("No user found");
    }

    return result.rows[0].current_value;
}