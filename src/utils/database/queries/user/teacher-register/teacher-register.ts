import Connection from "../../../Connection";
import generateToken from "@/utils/etc/generateToken";
import { AuthLevel } from "@/utils/etc/AuthLevel";

export async function registerTeacher(
    connection: Connection,
    username: string,
    passHash: string,
    email: string,
    name: string,
    surname: string,
    dateOfBirth: Date,
    iban: string,
    phoneNumber: string,
    profilePicture: Buffer
): Promise<string> {

    const { rows } = await connection.execute`
        SELECT USER_ID
        FROM USERS
        WHERE USERNAME = ${username}`;

    if (rows !== undefined && rows.length !== 0) {
        throw new Error("User already exists");
    }

    await connection.execute`
        INSERT INTO USERS (USERNAME, PASS_HASH, EMAIL, NAME, SURNAME, DATE_OF_BIRTH, AUTH_LEVEL, ACTIVATED)
        VALUES (${username}, ${passHash}, ${email}, ${name}, ${surname},
                TO_TIMESTAMP(${dateOfBirth}, 'YYYY-MM-DD HH24:MI:SS'), ${AuthLevel.TUTOR}, 0)`;

    const result = await connection.execute`
        SELECT USER_ID
        FROM USERS
        WHERE USERNAME = ${username}`;

    if (
        result.rows === undefined ||
        result.rows.length === 0 ||
        result.rows[0].user_id === undefined
    ) {
        throw new Error("Error creating user");
    }

    const newUserId = result.rows[0].user_id;

    await connection.execute`
        INSERT INTO TEACHERS (USER_ID, IBAN_NUMBER, PHONE_NUMBER, PROFILE_PICTURE)
        VALUES (${newUserId}, ${iban}, ${phoneNumber}, ${profilePicture})`;


    const activation_token = generateToken();

    await connection.execute`
        INSERT INTO ACTIVATION (USER_ID, TOKEN)
        VALUES ((SELECT USER_ID FROM USERS WHERE USERNAME = ${username}), ${activation_token})`;

    return activation_token;
}

