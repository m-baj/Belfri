import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     description: This endpoint allows a user to upload a file. The user must be authorized to upload a file.
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         application/octet-stream:
 *           schema:
 *             type: string
 *             format: binary
 *             description: The file to be uploaded.
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: The status of the upload process.
 *                 message:
 *                   type: string
 *                   description: A message about the result of the upload process.
 *                 fileName:
 *                   type: string
 *                   description: The name of the uploaded file.
 *       400:
 *         description: Invalid request headers
 *       405:
 *         description: Method not allowed, only POST requests are accepted.
 *       500:
 *         description: An error occurred while uploading the file.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const buffer = await req.body;

            if (req.headers["content-disposition"] !== undefined) {
                const fileName = `${Date.now()}-${req.headers["content-disposition"].split("filename=")[1]}`;
                const filePath = `./public/uploads/${fileName}`;

                await fs.writeFile(filePath, buffer);

                res.status(200).json({ success: true, message: "File uploaded successfully", fileName });
            } else {
                res.status(400).json({ success: false, message: "Invalid request headers" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
