import "@testing-library/jest-dom";
import React, { use } from "react";
import StudentRegistrationForm from "./StudentRegistrationForm";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("StudentRegistrationForm", () => {
    it("renders", () => {
        render(<StudentRegistrationForm />);
    });

    it("redirects to /login on successful registration", async () => {
        const user = userEvent.setup();

        const testUsername = "admin";
        const testName = "admin";
        const testSurname = "admin";
        const testPassword = "Admin123@#!";
        const testEmail = "admin@gmail.com";
        const testAccessKey = "123456";

        const { getByPlaceholderText, getByText, getByRole } = render(
            <StudentRegistrationForm />
        );
    });
}); /*  */
