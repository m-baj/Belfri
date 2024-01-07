import { createApiRoute } from "@/utils/api/createApiRoute";
import { activateUser } from "@/utils/database/queries/user/activate/activate";


interface ActivationData {
    token: string;
}

interface ActivationResponse {
    message: string;
}

/**
 * @swagger
 * /api/user/activate:
 *   post:
 *     summary: Activate a new user
 *     description: This endpoint allows you to activate a new user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The activation token for the user.
 *     responses:
 *       200:
 *         description: The user has been successfully activated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the activation process.
 *       400:
 *         description: Invalid request, the activation token is missing.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the activation process.
 */

export default createApiRoute<ActivationData, ActivationResponse>(
    "POST",
    (data) => data.token !== undefined,
    async (connection, data) => {

        await activateUser(connection, data.token);

        return {
            message: "User activated"
        };
    }
);