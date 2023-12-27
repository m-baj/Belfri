import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "@/utils/database/Connection";
import { registerTeacher } from "@/utils/database/queries/user/teacher-register/teacher-register";

interface RegistrationData {
    name: string;
    surname: string;
    username: string;
    email: string;
    passHash: string;
    dateOfBirth: Date;
    iban: string;
    phoneNumber: string;
    profilePictureUrl: string;
}

interface RegistrationResponse {
    message: string;
    activation_token?: string;
}

/**
 * @swagger
 * /api/teacher-register:
 *   post:
 *     summary: Register a new teacher
 *     description: This endpoint allows you to register a new teacher.
 *     tags:
 *       - Teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The teacher's first name.
 *               surname:
 *                 type: string
 *                 description: The teacher's last name.
 *               username:
 *                 type: string
 *                 description: The teacher's chosen username.
 *               email:
 *                 type: string
 *                 description: The teacher's email address.
 *               passHash:
 *                 type: string
 *                 description: The hashed version of the teacher's password.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The teacher's date of birth.
 *               iban:
 *                 type: string
 *                 description: The teacher's IBAN.
 *               phoneNumber:
 *                 type: string
 *                 description: The teacher's phone number.
 *               profilePictureUrl:
 *                 type: string
 *                 description: The teacher's profile picture url.
 *     responses:
 *       200:
 *         description: The teacher has been successfully registered, and an activation token is returned.
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
 *                   description: The activation token for the teacher. This is only present if the registration process is successful.
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
        !data.dateOfBirth ||
        !data.iban ||
        !data.phoneNumber ||
        !data.profilePictureUrl
    ) {
        res.status(400).json({
            message: "Invalid request"
        });
        return;
    }

    Connection.connect()
        .then(async (connection) => {
            try {
                console.log("here1");

                // profile picture URL to blob
                const response = await fetch(data.profilePictureUrl);
                const blob = new Buffer(await response.arrayBuffer());

                console.log(blob);

                const activation_token = await registerTeacher(
                    connection,
                    data.username,
                    data.passHash,
                    data.email,
                    data.name,
                    data.surname,
                    data.dateOfBirth,
                    data.iban,
                    data.phoneNumber,
                    blob
                );

                console.log("here2");

                await connection.commit();

                res.status(200).json({
                    message: "Teacher registered",
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