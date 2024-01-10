import { createApiRoute } from "@/utils/api/createApiRoute";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import Connection from "@/utils/database/Connection";
import { removeToken } from "@/utils/database/queries/user/logout/logout";


interface Response {
    message: string;
}

/**
 * @swagger
 * /api/user/check-auth:
 *   get:
 *     summary: Check user authorization
 *     description: This endpoint allows you to check if a user is authorized. The user's session token should be provided in a cookie named "token".
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: The user is authorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the authorization check.
 *       401:
 *         description: Unauthorized, the token is missing or invalid.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the authorization check.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
export default createApiRoute<{}, Response>(
    [{ name: "GET", authLevel: AuthLevel.STUDENT }],
    () => true,
    async (connection, data) => {
        return {
            message: "Authorized"
        };
    }
);