import Connection from "@/utils/database/Connection";
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthLevel } from "@/utils/etc/AuthLevel";

export function createApiRoute<Request, Response>(method: "POST" | "GET" | "PUT" | "DELETE", condition: (data: Request) => boolean, logic: (connection: Connection, data: Request) => Promise<Response & {
    message: string,
    status?: number
}>, authLevel: AuthLevel = AuthLevel.GUEST): (req: NextApiRequest, res: NextApiResponse<Response>) => Promise<void> {

    type ResponseWithMessage = Response & {
        message: string
    };

    async function handler(
        req: NextApiRequest,
        res: NextApiResponse<ResponseWithMessage>
    ) {
        if (req.method !== method) {
            res.status(405).json({
                message: "Method not allowed"
            } as ResponseWithMessage);
            return;
        }

        if (authLevel > AuthLevel.GUEST && !req.cookies.token) {
            res.status(401).json({
                message: "Unauthorized"
            } as ResponseWithMessage);
            return;
        }

        const data = req.body as Request;


        if (!condition(data)) {
            res.status(400).json({
                message: "Invalid request"
            } as ResponseWithMessage);
            return;
        }

        try {
            const connection = await Connection.connect();
            try {
                if (authLevel > AuthLevel.GUEST) {
                    await connection.authorize(req.cookies.token as string);
                }

                const response = await logic(connection, data);

                await connection.commit();

                const { status, ...rest } = response;

                if (status) {

                    res.status(status).json(rest as ResponseWithMessage);
                }

                res.status(200).json(rest as ResponseWithMessage);

            } catch (err: any) {
                await connection.rollback();
                res.status(500).json({
                    message: err.message
                } as ResponseWithMessage);
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message
            } as ResponseWithMessage);
        }
    }

    return handler;
}
