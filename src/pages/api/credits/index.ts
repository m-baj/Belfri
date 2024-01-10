import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { getCredits } from "@/utils/database/queries/credits/get/get";


interface Response {
    message: string;
    credits?: number;
}

/**
 * @swagger
 * /api/credits:
 *   get:
 *     summary: Get user credits
 *     description: This endpoint allows a student to get their current credits. The student must be authorized to get credits.
 *     tags:
 *       - Credits
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved credits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the retrieval process.
 *                 credits:
 *                   type: number
 *                   description: The current number of credits.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only GET requests are accepted.
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
        const credits = await getCredits(connection);

        return {
            message: "Successfully retrieved credits",
            credits: credits
        };
    }
);