import Connection from "../../../Connection";
import generateToken from "@/utils/etc/generateToken";

export async function registerUser(
    connection: Connection,
    username: string,
    passHash: string,
    email: string,
    name: string,
    surname: string,
    dateOfBirth: Date,
    authLevel: 1 | 2 | 3 = 1
): Promise<string> {

    const { rows } = await connection.execute(
        "SELECT USER_ID FROM USERS WHERE USERNAME = :username",
        [username]
    );

    console.log(rows);
    if (rows !== undefined && rows.length !== 0) {
        throw new Error("User already exists");
    }

    console.log(new Date(dateOfBirth).toISOString().slice(0, 10));

    function formatDate(date: Date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    console.log(formatDate(new Date(dateOfBirth)));

    console.log([username, passHash, email, name, surname, formatDate(new Date(dateOfBirth)), authLevel]);

    await connection.execute(
        "INSERT INTO USERS (USERNAME, PASS_HASH, EMAIL, NAME, SURNAME, DATE_OF_BIRTH, AUTH_LEVEL, ACTIVATED) VALUES (:username, :passHash, :email, :name, :surname, TO_TIMESTAMP(:dateOfBirth, 'YYYY-MM-DD HH24:MI:SS'), :authLevel, 0)",
        [username, passHash, email, name, surname, formatDate(new Date(dateOfBirth))
            , authLevel]
    );

    const activation_token = generateToken();

    await connection.execute(
        "INSERT INTO ACTIVATION (USER_ID, TOKEN) VALUES ((SELECT USER_ID FROM USERS WHERE USERNAME = :username), :token)",
        [username, activation_token]);

    console.log("here2");

    return activation_token;
}

