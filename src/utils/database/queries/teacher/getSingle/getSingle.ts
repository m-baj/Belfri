import Connection from "@/utils/database/Connection";

interface TeacherData {
    teacherID: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    username: string;
    rating: number;
    profilePicture: Buffer;
}

export async function getTeacherById(connection: Connection, id: number) {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const result = await connection.execute`SELECT *
                                            FROM TEACHERS
                                            WHERE TEACHER_ID = ${id}
                                                FETCH NEXT 1 ROW ONLY`;

    if (!result || !result.rows || result.rows.length == 0) {
        throw new Error("No teacher found");
    }

    const userID = result.rows[0].user_id;

    const userData = await connection.execute`SELECT *
                                              FROM USERS
                                              WHERE USER_ID = ${userID}
                                                  FETCH NEXT 1 ROW ONLY`;

    if (!userData || !userData.rows || userData.rows.length == 0) {
        throw new Error("No user found");
    }

    return {
        teacherID: result.rows[0].teacher_id,
        name: userData.rows[0].name,
        surname: userData.rows[0].surname,
        email: userData.rows[0].email,
        phone: userData.rows[0].phone,
        username: userData.rows[0].username,
        rating: result.rows[0].rating,
        profilePicture: result.rows[0].profile_picture
    } as TeacherData;
}