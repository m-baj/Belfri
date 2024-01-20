import Connection from "@/utils/database/Connection";


export async function getLessons(connection: Connection, teacherID: number) {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const result = await connection.execute`
                                            SELECT
                                                LESSONS.LESSON_ID,
                                                LESSONS."DATE",
                                                LESSONS.DURATION,
                                                OFFERS.NAME AS TITLE,
                                                CATEGORIES.NAME AS CATEGORY,
                                                USERS.USERNAME AS STUDENT,
                                                STATUSES.STATUS_NAME AS STATUS
                                            FROM LESSONS
                                            JOIN OFFERS USING (OFFER_ID)
                                            JOIN CATEGORIES ON OFFERS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                            JOIN USERS ON LESSONS.USER_ID = USERS.USER_ID
                                            JOIN STATUSES ON LESSONS.STATUS_ID = STATUSES.STATUS_ID
                                            WHERE OFFERS.TEACHER_ID = ${teacherID}
                                            `;

    if (result && result.rows && result.rows.length > 0) {
        return result.rows.map(row => {
            return {
                lessonID: row.lesson_id,
                date: row.DATE,
                duration: row.duration,
                title: row.title,
                category: row.category,
                student: row.student,
                status: row.status
            };
        });
    }

    throw new Error("No lessons found");
}
