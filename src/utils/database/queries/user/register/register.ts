import Connection from "../../../Connection";
import generateToken from "@/utils/etc/generateToken";
import { AuthLevel } from "@/utils/etc/AuthLevel";

export async function registerUser(
    connection: Connection,
    username: string,
    passHash: string,
    email: string,
    name: string,
    surname: string,
    dateOfBirth: Date,
    authLevel: AuthLevel = AuthLevel.STUDENT
): Promise<string> {

    const { rows } = await connection.execute`SELECT *
                                              FROM USERS
                                              WHERE USERNAME = ${username}`;


    if (rows !== undefined && rows.length !== 0) {
        throw new Error("User already exists");
    }


    await connection.execute
        `INSERT INTO USERS (USERNAME, PASS_HASH, EMAIL, NAME, SURNAME, DATE_OF_BIRTH, AUTH_LEVEL, ACTIVATED)
         VALUES (${username}, ${passHash}, ${email}, ${name}, ${surname},
                 TO_TIMESTAMP(${dateOfBirth}, 'YYYY-MM-DD HH24:MI:SS'),
                 ${authLevel}, 0)`;

    const activation_token = generateToken();

    await connection.execute`INSERT INTO ACTIVATION (USER_ID, TOKEN)
                             VALUES ((SELECT USER_ID FROM USERS WHERE USERNAME = ${username}), ${activation_token})`;

    return activation_token;
}

