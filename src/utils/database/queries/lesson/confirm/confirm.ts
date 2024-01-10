import Connection from "@/utils/database/Connection";

export async function confirmLesson(connection: Connection, lessonID: number) {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const user_id = connection.getUserID();

    await connection.execute`UPDATE LESSONS
                             SET STATUS_ID = 4
                             WHERE LESSON_ID = ${lessonID}
                               AND USER_ID = ${user_id}`;
}