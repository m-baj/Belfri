import OracleDB from "oracledb";
import { getUserAuth } from "./queries/authorize";

// Define the database connection details
const dbConfig: OracleDB.ConnectionAttributes = {
    user: 'aszokals',
    password: 'aszokals',
    connectString: 'ora4.ii.pw.edu.pl:1521/pdb1.ii.pw.edu.pl',
  };

enum AuthLevel {
    ADMIN = 3,
    TUTOR = 2,   
    STUDENT = 1,
    GUEST = 0
}

/* The Connection class is a TypeScript class that represents a connection to an Oracle database and
provides methods for executing SQL queries and managing authorization levels. */

export default class Connection{
    private connection: OracleDB.Connection;
    private authLevel: AuthLevel = AuthLevel.GUEST;
    private username: string | null = null;
    
    constructor (connection: OracleDB.Connection) {
        this.connection = connection;
    }

    public static async connect(): Promise<Connection> {
        const connection = await OracleDB.getConnection(dbConfig);
        return new Connection(connection);
    }

    public async close(): Promise<void> {
        await this.connection.close();
    }

    public async execute(sql: string, bindParams?: OracleDB.BindParameters ): Promise<OracleDB.Result<any>> {
        if (bindParams === undefined) {
            return await this.connection.execute(sql);
        }
        return await this.connection.execute(sql, bindParams);
    }

    public async authorize(token: string): Promise<boolean> {
        const result = await getUserAuth(this, token);
        if (result) {
            this.authLevel = result.authLevel;
            this.username = result.username;
            return true;
        }
        return false;
    }

    public isAuthorized(leastLevel: AuthLevel = AuthLevel.STUDENT): boolean {
        return this.authLevel >= leastLevel;
    }
}