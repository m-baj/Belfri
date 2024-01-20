import Connection from "@/utils/database/Connection";

// interface Lesson {
//     lessonID: number;
//     date: Date;
//     duration: number;
// }
//
export async function getLessons(connection: Connection, teacherID: number) {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const result = await connection.execute`
                                            SELECT LESSONS.LESSON_ID,
                                                   LESSONS.DURATION,
                                                   TO_CHAR(LESSONS."DATE" AT TIME ZONE 'WET', 'DD/MM/YYYY') AS lessonDate,
                                                   TO_CHAR(LESSONS."DATE" AT TIME ZONE 'WET', 'HH24:MI') AS lessonTime,
                                                   CATEGORIES.NAME AS categoryName
                                            FROM LESSONS
                                            JOIN OFFERS USING (OFFER_ID)
                                            JOIN CATEGORIES ON OFFERS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                            WHERE OFFERS.TEACHER_ID = ${teacherID}
                                            `;

    if (result && result.rows && result.rows.length > 0) {
        return result.rows.map(row => {
            return {
                lessonID: row.lesson_id,
                duration: row.duration,
                lessonDate: row.lessondate,
                lessonTime: row.lessontime,
                categoryName: row.categoryname,
            };
        });
    }

    throw new Error("No lessons found");
}