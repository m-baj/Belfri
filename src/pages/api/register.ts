import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "@/utils/database/Connection";
import { registerUser } from "@/utils/database/queries/user/register/register";

interface RegistrationData {
    name: string;
    surname: string;
    username: string;
    email: string;
    passHash: string;
    dateOfBirth: Date;
}

interface RegistrationResponse {
    message: string;
    activation_token?: string;
}

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows you to register a new user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's first name.
 *               surname:
 *                 type: string
 *                 description: The user's last name.
 *               username:
 *                 type: string
 *                 description: The user's chosen username.
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               passHash:
 *                 type: string
 *                 description: The hashed version of the user's password.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth.
 *     responses:
 *       200:
 *         description: The user has been successfully registered, and an activation token is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message about the result of the registration process.
 *                 activation_token:
 *                   type: string
 *                   description: The activation token for the user. This is only present if the registration process is successful.
 *       400:
 *         description: Invalid request, some registration data is missing.
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while connecting to the database or during the registration process.
 */

export default function handler(req: NextApiRequest, res: NextApiResponse<RegistrationResponse>) {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "Method not allowed"
        });
        return;
    }

    const data = req.body as RegistrationData;

    if (
        !data.name ||
        !data.surname ||
        !data.username ||
        !data.email ||
        !data.passHash ||
        !data.dateOfBirth
    ) {
        res.status(400).json({
            message: "Invalid request"
        });
        return;
    }

    Connection.connect()
        .then(async (connection) => {
            try {
                const activation_token = await registerUser(
                    connection,
                    data.username,
                    data.passHash,
                    data.email,
                    data.name,
                    data.surname,
                    data.dateOfBirth
                );

                await connection.commit();

                res.status(200).json({
                    message: "User registered",
                    activation_token: activation_token
                });
            } catch (err: any) {
                await connection.rollback();

                res.status(500).json({
                    message: err.message
                });
            }

        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
}