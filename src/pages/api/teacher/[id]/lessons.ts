import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { getLessons } from "@/utils/database/queries/teacher/getLessons/getLessons";

interface Lesson {
    lessonID: number;
    date: Date;
    duration: number;
}

interface Response {
    message: string;
    lessons?: Array<Lesson>;
}

/**
 * @swagger
 * /api/teacher/{id}/lessons:
 *   get:
 *     summary: Get lessons for a teacher
 *     description: This endpoint allows a student to get lessons for a specific teacher. The student must be authorized to get lessons.
 *     tags:
 *       - Lessons
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
 *         description: Successfully fetched lessons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the fetch process.
 *                 lessons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       lessonID:
 *                         type: number
 *                         description: The ID of the lesson.
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date of the lesson.
 *                       duration:
 *                         type: number
 *                         description: The duration of the lesson.
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only GET requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the fetch process.
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


        const lessons = await getLessons(connection, teacherID);
        return {
            message: "Successfully fetched teacher",
            lessons: lessons
        };
    }
);