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
                                                   LESSONS."DATE" AS lessonDate,
                                                   CATEGORIES.NAME AS categoryName
                                            FROM LESSONS
                                            JOIN OFFERS USING (OFFER_ID)
                                            JOIN CATEGORIES ON OFFERS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                            WHERE OFFERS.TEACHER_ID = ${teacherID}
                                            `;

    if (result && result.rows && result.rows.length > 0) {
        console.log(result.rows);
        return result.rows.map(row => {
            return {
                lessonID: row.lesson_id,
                duration: row.duration,
                lessonDate: row.lessondate,
                // lessonTime: row.lessontime,
                categoryName: row.categoryname,
            };
        });
    }

    throw new Error("No lessons found");
}