import { getUserAuth } from "@/utils/database/queries/user/authorize/authorize";
import { AuthLevel } from "@/utils/etc/AuthLevel";
import * as PostgreSQL from "@vercel/postgres";

/* The Connection class is a TypeScript class that represents a connection to an Oracle database and
provides methods for executing SQL queries and managing authorization levels. */

export default class Connection {
    private connection: PostgreSQL.VercelPoolClient;
    private authLevel: AuthLevel = AuthLevel.GUEST;
    private user_id: string | null = null;

    constructor(connection: PostgreSQL.VercelPoolClient) {
        this.connection = connection;
    }

    public static async connect(): Promise<Connection> {
        const connection = await PostgreSQL.db.connect();
        return new Connection(connection);
    }

    public close() {
        this.connection.release();
    }

    public async execute(query: TemplateStringsArray, ...params: any[]): Promise<PostgreSQL.QueryResult<PostgreSQL.QueryResultRow>> {
        return await this.connection.sql(query, ...params);
    }

    public async commit(): Promise<void> {
        await this.connection.query("COMMIT");
    }

    public async rollback(): Promise<void> {
        await this.connection.query("ROLLBACK");
    }

    public async authorize(token: string): Promise<boolean> {
        const result = await getUserAuth(this, token);
        if (result) {
            this.authLevel = result.authLevel;
            this.user_id = result.user_id;
            return true;
        }
        return false;
    }

    public isAuthorized(leastLevel: AuthLevel = AuthLevel.STUDENT): boolean {
        return this.authLevel >= leastLevel;
    }

    public getUserID(): string | null {
        return this.user_id;
    }
}
