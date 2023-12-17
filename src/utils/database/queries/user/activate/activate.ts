import Connection from "@/utils/database/Connection";

export async function activateUser(connection: Connection, activation_token: string): Promise<void> {
    await connection.execute(
        "UPDATE USERS SET ACTIVATED = 1 WHERE USER_ID = (SELECT USER_ID FROM ACTIVATION WHERE TOKEN = :activation_token)",
        [activation_token]
    );

    await connection.execute(
        "DELETE FROM ACTIVATION WHERE TOKEN = :activation_token",
        [activation_token]
    );
}