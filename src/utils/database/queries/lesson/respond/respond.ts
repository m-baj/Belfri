import Connection from "@/utils/database/Connection";
import { generateEmailText, lessonResponseEmailTemplate } from "@/utils/etc/email/generateEmailText";
import { sendEmail } from "@/utils/etc/email/sendEmail";
import config from "@/configs/app.config";

export async function respondLesson(connection: Connection, lessonID: number, accept: boolean) {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const status_id = accept ? 3 : 2;

    const user_id = connection.getUserID();

    const teacher_data = await connection.execute`SELECT TEACHER_ID
                                                  FROM TEACHERS
                                                  WHERE USER_ID = ${user_id}
                                                      FETCH NEXT 1 ROW ONLY`;

    if (!teacher_data || !teacher_data.rows || teacher_data.rows.length == 0) {
        throw new Error("No teacher found");
    }

    const teacher_id = teacher_data.rows[0].teacher_id;

    await connection.execute`UPDATE LESSONS
                             SET STATUS_ID = ${status_id}
                             WHERE LESSON_ID = ${lessonID}
                               AND OFFER_ID IN (SELECT OFFER_ID
                                                FROM OFFERS
                                                WHERE TEACHER_ID = ${teacher_id})`;

    const lessonData = await connection.execute`SELECT USERS.NAME, USERS.SURNAME, USERS.EMAIL
                                                FROM LESSONS
                                                         JOIN USERS USING (USER_ID)
                                                WHERE LESSON_ID = ${lessonID}
                                                    FETCH NEXT 1 ROW ONLY`;

    if (!lessonData || !lessonData.rows || lessonData.rows.length == 0) {
        throw new Error("No lesson found");
    }

    const userName = lessonData.rows[0].name + " " + lessonData.rows[0].surname;
    const userEmail = lessonData.rows[0].email;

    const teacherData = await connection.execute`SELECT USERS.NAME, USERS.SURNAME
                                                 FROM TEACHERS
                                                          JOIN USERS USING (USER_ID)
                                                 WHERE TEACHER_ID = ${teacher_id}
                                                     FETCH NEXT 1 ROW ONLY`;

    if (!teacherData || !teacherData.rows || teacherData.rows.length == 0) {
        throw new Error("No teacher found");
    }

    const teacherName = teacherData.rows[0].name + " " + teacherData.rows[0].surname;

    const lessonDate = await connection.execute`SELECT "DATE"
                                                FROM LESSONS
                                                WHERE LESSON_ID = ${lessonID}
                                                    FETCH NEXT 1 ROW ONLY`;


    if (!lessonDate || !lessonDate.rows || lessonDate.rows.length == 0) {
        throw new Error("No lesson found");
    }

    const date = new Date(lessonDate.rows[0].DATE);

    const offerData = await connection.execute`SELECT OFFERS.NAME
                                               FROM OFFERS
                                                        JOIN LESSONS USING (OFFER_ID)
                                               WHERE LESSON_ID = ${lessonID}
                                                   FETCH NEXT 1 ROW ONLY`;

    if (!offerData || !offerData.rows || offerData.rows.length == 0) {
        throw new Error("No offer found");
    }


    const offerName = offerData.rows[0].name;

    const emailContent = await generateEmailText(lessonResponseEmailTemplate, {
        user: userName,
        teacher: teacherName,
        offer: offerName,
        date: date.toISOString(),
        response: accept ? "accepted" : "declined",
        footer: `Click <a href="${config.url + "/confirm/" + lessonID.toString()}"> here </a> to confirm the lesson after it has taken place.`
    });

    await sendEmail(userEmail, "Lesson response", emailContent);
}