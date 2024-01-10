import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { respondLesson } from "@/utils/database/queries/lesson/respond/respond";

interface RespondData {
    lessonID: number;
    accept: boolean;
}

interface Response {
    message: string;
}

/**
 * @swagger
 * /api/lesson/respond:
 *   post:
 *     summary: Respond to a lesson
 *     description: This endpoint allows a tutor to respond to a lesson request. The tutor must be authorized to respond to a lesson.
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
 *               accept:
 *                 type: boolean
 *                 description: The tutor's response to the lesson request.
 *     responses:
 *       200:
 *         description: Successfully responded to the lesson request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the response process.
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the tutor is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the response process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
export default createApiRoute<
    RespondData, Response>(
    [{
        name: "POST",
        authLevel: AuthLevel.TUTOR
    }],
    (data) => data.lessonID !== undefined && data.accept !== undefined,
    async (connection, data, req) => {

        await respondLesson(connection, data.lessonID, data.accept);

        return {
            message: "Lesson response sent successfully"
        };
    }
);