import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import Connection from "@/utils/database/Connection";
import { removeToken } from "@/utils/database/queries/user/logout/logout";


interface Response {
    message: string;
}

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Log out a user
 *     description: This endpoint allows you to log out a user. The user's session token should be provided in a cookie named "token".
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: The user has been successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the logout process.
 *       401:
 *         description: Unauthorized, the token is missing or invalid.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the logout process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */

export default createApiRoute<{}, Response>(
    "POST",
    () => true,
    async (connection, data) => {
        await removeToken(connection);
        return {
            message: "Logged out"
        };
    },
    AuthLevel.STUDENT
);