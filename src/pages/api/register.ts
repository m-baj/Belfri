import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "@/utils/database/Connection";
import { registerUser } from "@/utils/database/queries/user/register/register";
import { sendEmail } from "@/utils/etc/email/sendEmail";
import { activationEmailTemplate, generateEmailText } from "@/utils/etc/email/generateEmailText";

interface RegistrationData {
    name: string;
    surname: string;
    username: string;
    email: string;
    passHash: string;
    dateOfBirth: Date;
    authLevel: 1 | 2 | 3;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
        !data.authLevel
    ) {
        res.status(400).json({
            message: "Invalid request"
        });
        return;
    }


    Connection.connect()
        .then(async (connection) => {
            const activation_token = await registerUser(
                connection,
                data.username,
                data.passHash,
                data.email,
                data.name,
                data.surname,
                data.dateOfBirth,
                data.authLevel
            );

            const email_contents = await generateEmailText(activationEmailTemplate, {
                username: data.username,
                activation_url: "http://localhost:3000/activate?token=" + activation_token
            });

            await sendEmail(data.email, "Belfri Account Activation", email_contents);

            await connection.commit();
            
            res.status(200).json({
                message: "User registered"
            });

        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
}
