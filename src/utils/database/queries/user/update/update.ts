import Connection from "@/utils/database/Connection";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface UserData {
    name?: string;
    surname?: string;
    email?: string;
    dateOfBirth?: Date;

    iban?: string;
    phoneNumber?: string;
    profilePicture?: Buffer;
}

/**
 * This function is used to update the user data in the database.
 *
 * @param {Connection} connection - The connection object to the database.
 * @param {UserData} userData - The user data to be updated.
 * @throws {Error} Will throw an error if the connection is not authorized.
 * @throws {Error} Will throw an error if trying to update TEACHER fields for a regular USER.
 * @returns {Promise<void>} Returns a promise that resolves to void.
 */
export async function updateUserData(
    connection: Connection,
    userData: UserData
): Promise<void> {
    if (!connection.isAuthorized()) {
        throw new Error("Unauthorized");
    }

    const isTeacher = connection.isAuthorized(AuthLevel.TUTOR);

    const { name, surname, email, dateOfBirth } = userData;
    const userId = connection.getUserID();

    if (name) {
        await connection.execute`
            UPDATE USERS
            SET NAME = ${name}
            WHERE USER_ID = ${userId}`;
    }

    if (surname) {
        await connection.execute`
            UPDATE USERS
            SET SURNAME = ${surname}
            WHERE USER_ID = ${userId}`;
    }

    if (email) {
        await connection.execute`
            UPDATE USERS
            SET EMAIL = ${email}
            WHERE USER_ID = ${userId}`;
    }

    if (dateOfBirth) {
        await connection.execute`
            UPDATE USERS
            SET DATE_OF_BIRTH = ${dateOfBirth}
            WHERE USER_ID = ${userId}`;
    }

    if (userData.iban) {
        if (!isTeacher) {
            throw new Error("Cannot update IBAN for a regular user");
        }
        await connection.execute`
            UPDATE teachers
            SET iban_number = ${userData.iban}
            WHERE USER_ID = ${userId}`;
    }

    if (userData.phoneNumber) {
        if (!isTeacher) {
            throw new Error("Cannot update phone number for a regular user");
        }
        await connection.execute`
            UPDATE teachers
            SET phone_number = ${userData.phoneNumber}
            WHERE USER_ID = ${userId}`;
    }

    if (userData.profilePicture) {
        if (!isTeacher) {
            throw new Error("Cannot update profile picture for a regular user");
        }
        await connection.execute`
            UPDATE teachers
            SET profile_picture = ${userData.profilePicture}
            WHERE USER_ID = ${userId}`;
    }
}