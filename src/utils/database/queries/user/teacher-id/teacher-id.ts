import Connection from "@/utils/database/Connection";

export async function getTeacherID (connection: Connection) : Promise<void> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const userID = connection.getUserID()

    const result = await connection.execute`SELECT teacher_id
                                            FROM teachers
                                            WHERE user_id = ${userID}
                                            FETCH FIRST 1 ROW ONLY`;

    return result.rows[0].teacher_id;
}