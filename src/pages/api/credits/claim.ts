import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import { claimCredits } from "@/utils/database/queries/credits/claim/claim";

interface Request {
    token: string;
}

interface Response {
    message: string;
}

/**
 * @swagger
 * /api/credits/claim:
 *   put:
 *     summary: Claim credits
 *     description: This endpoint allows a user to claim credits using a token. The user must be authorized to claim credits.
 *     tags:
 *       - Credits
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The token used to claim credits.
 *     responses:
 *       200:
 *         description: Successfully claimed credits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the claim process.
 *       400:
 *         description: Invalid request, the token is missing.
 *       401:
 *         description: Unauthorized, the user is not logged in or does not have sufficient permissions.
 *       405:
 *         description: Method not allowed, only PUT requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the claim process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */

export default createApiRoute<Request, Response>(
    "PUT",
    (data) => data.token !== undefined,
    async (connection, data) => {
        await claimCredits(connection, data.token);

        return {
            message: "Successfully claimed credits"
        };
    },
    AuthLevel.STUDENT
);