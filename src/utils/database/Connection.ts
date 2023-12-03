import OracleDB from "oracledb";

// Define the database connection details
const dbConfig: OracleDB.ConnectionAttributes = {
    user: 'aszokals',
    password: 'aszokals',
    connectString: 'ora4.ii.pw.edu.pl:1521/pdb1.ii.pw.edu.pl', // e.g., 'localhost:1521/your_service_name'
  };

enum AuthLevel {
    ADMIN = 3,
    TUTOR = 2,   
    STUDENT = 1,
    GUEST = 0
}

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

    public isAuthorized(leastLevel: AuthLevel = AuthLevel.STUDENT): boolean {
        return this.authLevel >= leastLevel;
    }
}