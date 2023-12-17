import { removeToken } from "@/utils/database/queries/user/logout/logout";
import Connection from "@/utils/database/Connection";
import { describe, jest } from "@jest/globals";

describe("removeToken", () => {
    it("should remove token from database", async () => {
        Connection.connect().then(async (connection) => {
            const execute = jest.fn();
            execute.mockReturnValueOnce({ rows: [] });
            // @ts-ignore
            connection.execute = execute;
            await removeToken(connection, "test");
            expect(execute).toHaveBeenCalledWith(
                "DELETE FROM tokens WHERE token = :token",
                ["test"]
            );
        });
    });

    it("should commit changes", async () => {
        Connection.connect().then(async (connection) => {
            const commit = jest.fn();
            // @ts-ignore
            connection.commit = commit;
            await removeToken(connection, "test");
            expect(commit).toHaveBeenCalled();
        });
    });

    it("should throw error if token does not exist", async () => {
        Connection.connect().then(async (connection) => {
            const execute = jest.fn();
            execute.mockReturnValueOnce({ rows: [] });
            // @ts-ignore
            connection.execute = execute;
            await expect(removeToken(connection, "test")).rejects.toThrow("Token does not exist");
        });
    });
});