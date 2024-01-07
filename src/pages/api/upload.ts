import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";

const form = formidable({ multiples: true });

type Data = {
    message?: string;
} | any[];

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
): Promise<void> => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const [fileContent, filename] = await new Promise<[string, string]>((resolve, reject) => {
            form.parse(req, (err, _fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }

                const file = (Object.values(files)[0] as File[])?.[0];

                if (!file) {
                    reject("No file found");
                    return;
                }

                const fileContent = fs.readFileSync(file.filepath, { encoding: "utf8" });

                fs.unlinkSync(file.filepath);

                const fname = file.originalFilename;

                if (!fname) {
                    reject("No filename found");
                    return;
                }

                resolve([fileContent, fname]);
            });
        });

        const writeFilename = `${Date.now()}-${filename}`;
        const filePath = `./public/uploads/${writeFilename}`;
        console.log(`Writing file to ${filePath}`);
        fs.writeFileSync(filePath, fileContent);

        res.status(200).send({ message: "ok" });
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" });
    }
};

export default handler;
