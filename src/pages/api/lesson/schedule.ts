import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { getLessons } from "@/utils/database/queries/teacher/getLessons/getLessons";
import { scheduleLesson } from "@/utils/database/queries/lesson/schedule/schedule";

interface ScheduleData {
    offerID: number;
    date: Date;
    duration: number;
}

interface Response {
    message: string;
    lessonID?: number;
}

/**
 * @swagger
 * /api/lesson/schedule:
 *   post:
 *     summary: Schedule a lesson
 *     description: This endpoint allows a student to schedule a lesson. The student must be authorized to schedule a lesson.
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
 *               offerID:
 *                 type: number
 *                 description: The ID of the offer.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date of the lesson.
 *               duration:
 *                 type: number
 *                 description: The duration of the lesson.
 *     responses:
 *       200:
 *         description: Successfully scheduled the lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the scheduling process.
 *                 lessonID:
 *                   type: number
 *                   description: The ID of the scheduled lesson.
 *       400:
 *         description: Invalid request, some required fields are missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the scheduling process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
export default createApiRoute<ScheduleData, Response>(
    [{
        name: "POST",
        authLevel: AuthLevel.STUDENT
    }],
    (data) => data.offerID !== undefined && data.date !== undefined && data.duration !== undefined,
    async (connection, data, req) => {
        const lessonID = await scheduleLesson(connection, data);

        return {
            message: "Lesson scheduled successfully",
            lessonID
        };
    }
);