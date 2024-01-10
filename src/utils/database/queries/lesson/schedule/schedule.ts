import Connection from "@/utils/database/Connection";
import { generateEmailText, lessonAcceptEmailTemplate } from "@/utils/etc/email/generateEmailText";
import { sendEmail } from "@/utils/etc/email/sendEmail";
import config from "@/configs/app.config";

interface ScheduleData {
    offerID: number;
    date: Date;
    duration: number;
}

export async function scheduleLesson(connection: Connection, data: ScheduleData): Promise<number> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const user_id = connection.getUserID();

    const result = await connection.execute`INSERT INTO LESSONS (OFFER_ID, USER_ID, "DATE", DURATION)
                                            VALUES (${data.offerID}, ${user_id}, ${data.date}, ${data.duration})
                                            RETURNING LESSON_ID`;


    const lessonID = result.rows[0].lesson_id;

    const teacherData = await connection.execute`SELECT USERS.NAME, USERS.SURNAME, USERS.EMAIL
                                                 FROM OFFERS
                                                          JOIN TEACHERS USING (TEACHER_ID)
                                                          JOIN USERS USING (USER_ID)
                                                 WHERE OFFER_ID = ${data.offerID}
                                                     FETCH NEXT 1 ROW ONLY`;

    if (!teacherData || !teacherData.rows || teacherData.rows.length == 0) {
        throw new Error("No teacher found");
    }

    const teacherName = teacherData.rows[0].name + " " + teacherData.rows[0].surname;
    const teacherEmail = teacherData.rows[0].email;

    const userData = await connection.execute`SELECT USERS.NAME
                                              FROM USERS
                                              WHERE USER_ID = ${user_id}
                                                  FETCH NEXT 1 ROW ONLY`;

    if (!userData || !userData.rows || userData.rows.length == 0) {
        throw new Error("No user found");
    }

    const userName = userData.rows[0].name;

    const offerData = await connection.execute`SELECT name
                                               FROM OFFERS
                                               WHERE OFFER_ID = ${data.offerID}
                                                   FETCH NEXT 1 ROW ONLY`;


    if (!offerData || !offerData.rows || offerData.rows.length == 0) {
        throw new Error("No offer found");
    }

    const offerName = offerData.rows[0].name;

    const acceptLink = config.url + "/accept/" + lessonID;
    const declineLink = config.url + "/decline/" + lessonID;

    const emailContent = await generateEmailText(lessonAcceptEmailTemplate, {
        user: userName,
        teacher: teacherName,
        offer: offerName,
        date: new Date(data.date).toISOString(),
        duration: data.duration.toString(),
        acceptLink: acceptLink,
        declineLink: declineLink
    });

    await sendEmail(teacherEmail, "Belfri - someone requested a lesson!", emailContent);

    return lessonID;
}