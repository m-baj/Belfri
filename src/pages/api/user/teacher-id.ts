import { createApiRoute } from "@/utils/api/createApiRoute";
import { getTeacherID } from "@/utils/database/queries/user/teacher-id/teacher-id";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface Input {}

interface Response {
    message: string,
    teacherID?: number
}

export default createApiRoute<Input, Response>(
    [{
        name: "GET",
        authLevel: AuthLevel.TUTOR
    }],
    async (connection) => {
        const teacher = await getTeacherID(connection);
        return {
            message: "Successfully fetched teacherID",
            teacherID: teacher
        };
    }
);