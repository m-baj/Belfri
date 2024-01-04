import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "@/utils/database/Connection";
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<ActivationResponse>) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "Method not allowed"
        });
        return;
    }

    const data = req.body as ActivationData;

    if (!data.token) {
        res.status(400).json({
            message: "Invalid request"
        });
        return;
    }

    try {
        const connection = await Connection.connect()
            try {
                await activateUser(connection, data.token);

                await connection.commit();

                res.status(200).json({
                    message: "User activated"
                });
            } catch (err: any) {
                await connection.rollback();

                res.status(500).json({
                    message: err.message
                });
            }

        } catch (err:any){
        res.status(500).json({
            message: err.message
        })
    }
}
