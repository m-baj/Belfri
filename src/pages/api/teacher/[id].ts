import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { getTeacherById } from "@/utils/database/queries/teacher/getSingle/getSingle";

interface TeacherData {
    teacherID: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    username: string;
    rating: number;
    profilePicture: string;
}

interface Response {
    message: string;
    data?: TeacherData;
}

/**
 * @swagger
 * /api/teacher/{id}:
 *   get:
 *     summary: Retrieve a teacher by ID
 *     description: This endpoint allows a student to retrieve a teacher's information by their ID. The student must be authorized to retrieve the teacher's information.
 *     tags:
 *       - Teachers
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the teacher.
 *     responses:
 *       200:
 *         description: Successfully retrieved a teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teacherID:
 *                   type: number
 *                 name:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 username:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 profilePicture:
 *                   type: string
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       404:
 *         description: No teacher found with the provided ID.
 *       500:
 *         description: An error occurred while connecting to the database or during the retrieval process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
export default createApiRoute<{}, Response>(
    [{
        name: "GET",
        authLevel: AuthLevel.STUDENT
    }],
    (data) => true,
    async (connection, data, req) => {
        const { id } = req.query;
        if (typeof id !== "string") throw new Error("Invalid ID");
        const teacherID = parseInt(id);
        if (isNaN(teacherID)) throw new Error("Invalid ID");

        const teacher = await getTeacherById(connection, teacherID);

        return {
            message: "Successfully fetched teacher",
            data: {
                teacherID: teacher.teacherID,
                name: teacher.name,
                surname: teacher.surname,
                email: teacher.email,
                phone: teacher.phone,
                username: teacher.username,
                rating: teacher.rating,
                profilePicture: teacher.profilePicture.toString("base64")
            }
        };
    }
);