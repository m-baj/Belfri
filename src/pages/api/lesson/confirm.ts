import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { confirmLesson } from "@/utils/database/queries/lesson/confirm/confirm";

interface LessonData {
    lessonID: number;
}

interface Response {
    message: string;
}

/**
 * @swagger
 * /api/lesson/confirm:
 *   post:
 *     summary: Confirm a lesson
 *     description: This endpoint allows a student to confirm a lesson. The student must be authorized to confirm a lesson.
 *     tags:
 *       - Lessons
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonID:
 *                 type: number
 *                 description: The ID of the lesson.
 *     responses:
 *       200:
 *         description: Successfully confirmed the lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the confirmation process.
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the confirmation process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
export default createApiRoute<
    LessonData, Response>(
    [{
        name: "POST",
        authLevel: AuthLevel.STUDENT
    }],
    (data) => data.lessonID !== undefined,
    async (connection, data, req) => {

        await confirmLesson(connection, data.lessonID);

        return {
            message: "Lesson confirmed successfully"
        };
    }
);