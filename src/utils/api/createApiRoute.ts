import Connection from "@/utils/database/Connection";
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface Method {
    name: "POST" | "GET" | "PUT" | "DELETE";
    authLevel?: AuthLevel;
}

export function createApiRoute<Request, Response>(methods: Array<Method>, condition: (data: Request) => boolean, logic: (connection: Connection, data: Request, req: NextApiRequest) => Promise<Response & {
    message: string;
    status?: number
}>): (req: NextApiRequest, res: NextApiResponse<Response>) => Promise<void> {

    type ResponseWithMessage = Response & {
        message: string
    };

    async function handler(
        req: NextApiRequest,
        res: NextApiResponse<ResponseWithMessage>
    ) {
        if (req.method == undefined) {
            res.status(405).json({
                message: "Method not allowed"
            } as ResponseWithMessage);
            return;
        }

        if (methods.find(method => method.name == req.method) == undefined) {
            res.status(405).json({
                message: "Method not allowed"
            } as ResponseWithMessage);
            return;
        }

        let authLevel = methods.find(method => method.name == req.method)?.authLevel;

        if (authLevel == undefined) {
            authLevel = AuthLevel.GUEST;
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

                    if (!connection.isAuthorized(authLevel)) {
                        res.status(401).json({
                            message: "Unauthorized"
                        } as ResponseWithMessage);
                        return;
                    }
                }

                const response = await logic(connection, data, req);

                await connection.commit();

                const { status, ...rest } = response;

                if (status) {

                    res.status(status).json(rest as ResponseWithMessage);
                }

                res.status(200).json(rest as ResponseWithMessage);

            } catch (err: any) {
                await connection.rollback();
                res.status(400).json({
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
