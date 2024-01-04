import Connection from "@/utils/database/Connection";
import type { NextApiRequest, NextApiResponse } from "next";
import { removeUser } from "@/utils/database/queries/user/remove/remove";


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
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    if (req.method !== "DELETE") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    if (!req.cookies.token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const connection = await Connection.connect();
        try {
            await connection.authorize(req.cookies.token as string);
            await removeUser(connection);
            await connection.commit();

            return res.status(200).json({
                message: "User removed successfully"
            });
        } catch (err: any) {
            await connection.rollback();
            return res.status(500).json({
                message: err.message
            });
        }
    } catch (err: any) {
        return res.status(500).json({
            message: err.message
        });
    }
}
