import { createApiRoute } from "@/utils/api/createApiRoute";
import { removeUser } from "@/utils/database/queries/user/remove/remove";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface Response {
    message: string;
}

/**
 * @swagger
 * /api/user/remove:
 *   delete:
 *     summary: Remove a user
 *     description: This endpoint allows for removing a user from the database.
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User removed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the removal process.
 *       401:
 *         description: Unauthorized, the token is missing or invalid.
 *       405:
 *         description: Method not allowed, only DELETE requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the removal process.
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */


export default createApiRoute<{}, Response>(
    ["DELETE"],
    () => true,
    async (connection, data) => {
        await removeUser(connection);
        return {
            message: "User removed successfully"
        };
    },
    AuthLevel.STUDENT
);