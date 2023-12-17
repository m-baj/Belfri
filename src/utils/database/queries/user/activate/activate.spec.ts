import Connection from "@/utils/database/Connection";
import { describe, jest } from "@jest/globals";
import { activateUser } from "@/utils/database/queries/user/activate/activate";

describe("activateUser", () => {
    it("should update user to activated", async () => {
        Connection.connect().then(async (connection) => {
            const execute = jest.fn();
            execute.mockReturnValueOnce({ rows: [{ USER_ID: 1 }] });
            // @ts-ignore
            connection.execute = execute;
            await activateUser(connection, "test");
            expect(execute).toHaveBeenCalledWith(
                "UPDATE USERS SET ACTIVATED = 1 WHERE USER_ID = (SELECT USER_ID FROM ACTIVATION WHERE TOKEN = :activation_token)",
                ["test"]
            );
        });
    });

    it("should throw error if user does not exist", async () => {
        Connection.connect().then(async (connection) => {
            const execute = jest.fn();
            execute.mockReturnValueOnce({ rows: [] });
            // @ts-ignore
            connection.execute = execute;
            await expect(activateUser(connection, "test")).rejects.toThrow("User does not exist");
        });
    });
});