import { registerUser } from "@/utils/database/queries/user/register/register";
import Connection from "@/utils/database/Connection";
import { describe, jest } from "@jest/globals";

describe("registerUser", () => {
    it("should throw error if user exists", async () => {
        Connection.connect().then(async (connection) => {
            const execute = jest.fn();
            execute.mockReturnValueOnce({ rows: [{ USER_ID: 1 }] });
            // @ts-ignore
            connection.execute = execute;
            await expect(registerUser(connection, "test", "test", "test", "test", "test", new Date())).rejects.toThrow("User already exists");
        });
    });

    it("should insert user if user does not exist", async () => {
        Connection.connect().then(async (connection) => {
            const execute = jest.fn();
            execute.mockReturnValueOnce({ rows: [] });
            // @ts-ignore
            connection.execute = execute;
            await registerUser(connection, "test", "test", "test", "test", "test", new Date());
            expect(execute).toHaveBeenCalledWith(
                "INSERT INTO USERS (USERNAME, PASS_HASH, EMAIL, NAME, SURNAME, DATE_OF_BIRTH, AUTH_LEVEL, ACTIVATED) VALUES (:username, :passHash, :email, :name, :surname, :dateOfBirth, :authLevel, 0)",
                ["test", "test", "test", "test", "test", expect.any(Date), 1]
            );
        });

    });

    it("should add activation token", async () => {
        Connection.connect().then(async (connection) => {
            const execute = jest.fn();
            execute.mockReturnValueOnce({ rows: [] });
            // @ts-ignore
            connection.execute = execute;
            await registerUser(connection, "test", "test", "test", "test", "test", new Date());
            expect(execute).toHaveBeenCalledWith(
                "INSERT INTO ACTIVATION (USER_ID, TOKEN) VALUES ((SELECT USER_ID FROM USERS WHERE USERNAME = :username), :token)",
                ["test", expect.any(String)]
            );
        });
    });

    it("should commit transaction", async () => {
        Connection.connect().then(async (connection) => {
            const commit = jest.fn();
            // @ts-ignore
            connection.commit = commit;
            await registerUser(connection, "test", "test", "test", "test", "test", new Date());
            expect(commit).toHaveBeenCalled();
        });
    });
});