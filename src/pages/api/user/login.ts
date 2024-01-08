import { createApiRoute } from "@/utils/api/createApiRoute";
import { getToken } from "@/utils/database/queries/user/login/login";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface LoginData {
    username: string;
    passHash: string;
    remember: boolean;
}

interface LoginResponse {
    message: string;
    token?: string;
    auth_level?: AuthLevel;
    expiration_date?: Date;
}

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     description: This endpoint allows you to log in a user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's chosen username.
 *               passHash:
 *                 type: string
 *                 description: The hashed version of the user's password.
 *               remember:
 *                 type: boolean
 *                 description: Whether to remember the user's session.
 *     responses:
 *       200:
 *         description: The user has been successfully logged in, and a token is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the login process.
 *                 token:
 *                   type: string
 *                   description: The token for the user. This is only present if the login process is successful.
 *       400:
 *         description: Invalid request, the username or password is missing.
 *       401:
 *         description: Invalid username or password / account not activated.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the login process.
 */

export default createApiRoute<LoginData, LoginResponse>(
    [{
        name: "POST",
        authLevel: AuthLevel.GUEST
    }],
    (data) => data.username !== undefined && data.passHash !== undefined,
    async (connection, data) => {
        const result = await getToken(
            connection,
            data.username,
            data.passHash,
            data.remember
        );

        if (result) {
            const [token, authLevel, expirationDate] = result;
            return {
                message: "Login successful",
                token: token,
                auth_level: authLevel,
                expiration_date: expirationDate
            };
        } else {
            return {
                status: 401,
                message: "Invalid username or password / account not activated"
            };
        }
    }
);