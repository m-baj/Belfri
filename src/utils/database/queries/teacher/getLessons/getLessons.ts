import Connection from "@/utils/database/Connection";

interface Lesson {
    lessonID: number;
    date: Date;
    duration: number;
}

export async function getLessons(connection: Connection, teacherID: number) {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const result = await connection.execute`SELECT *
                                            FROM LESSONS
                                                     JOIN OFFERS USING (OFFER_ID)
                                            WHERE TEACHER_ID = ${teacherID}`;

    if (result && result.rows && result.rows.length > 0) {
        return result.rows.map(row => {
            return {
                lessonID: row.lesson_id,
                date: row.DATE,
                duration: row.duration
            };
        });
    }

    throw new Error("No lessons found");
}