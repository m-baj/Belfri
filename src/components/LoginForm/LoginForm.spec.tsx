import "@testing-library/jest-dom";
import React, { use } from "react";
import LoginForm from "./LoginForm";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

afterEach(() => {
    mockAxios.reset();
});

describe("LoginForm", () => {
    it("renders", () => {
        render(<LoginForm />);
    });

    it("renders a form", () => {
        const { getByRole } = render(<LoginForm />);
        const form = getByRole("form");
        expect(form).toBeInTheDocument();
    });

    it("renders correct fields", () => {
        const { getByLabelText } = render(<LoginForm />);
        const username = getByLabelText("Username");
        const password = getByLabelText("Password");
        const submit = getByLabelText("Submit");
        const rememberme = getByLabelText("Remember me");
        const forgotpassword = getByLabelText("Forgot password?");
        const register = getByLabelText("Register");

        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
        expect(rememberme).toBeInTheDocument();
        expect(forgotpassword).toBeInTheDocument();
        expect(register).toBeInTheDocument();
    });

    it("renders correct field types", () => {
        const { getByLabelText } = render(<LoginForm />);
        const username = getByLabelText("Username");
        const password = getByLabelText("Password");
        const submit = getByLabelText("Submit");
        const rememberme = getByLabelText("Remember me");
        const forgotpassword = getByLabelText("Forgot password?");
        const register = getByLabelText("Register");

        expect(username).toHaveAttribute("type", "text");
        expect(password).toHaveAttribute("type", "password");
        expect(submit).toHaveAttribute("type", "submit");
        expect(rememberme).toHaveAttribute("type", "checkbox");
        expect(forgotpassword).toHaveAttribute("type", "button");
        expect(register).toHaveAttribute("type", "button");
    });

    it("redirects to / on successful login", async () => {
        const user = userEvent.setup();

        const testPassword = "Admin123@#!";
        const testUsername = "admin";

        const { getByLabelText } = render(<LoginForm />);

        const usernameInput = getByLabelText("Username");
        const passwordInput = getByLabelText("Password");
        const submitButton = getByLabelText("Submit");

        user.type(usernameInput, testUsername);
        user.type(passwordInput, testPassword);
        await user.click(submitButton);

        expect(mockAxios.post).toHaveBeenCalledWith("/web-service-url/", {
            data: {
                username: testUsername,
                passwordHash: "ab",
            },
        });

        mockAxios.mockResponse({
            data: {
                token: "testToken",
            },
        });

        expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
    it("shows error message when login data incorrect", async () => {
        const user = userEvent.setup();
        const testPassword = "Admin123@#!";
        const testUsername = "admin";
        const testMessage = "wrong password";
        const { getByLabelText, getByText } = render(<LoginForm />);

        const usernameInput = getByLabelText("Username");
        const passwordInput = getByLabelText("Password");
        const submitButton = getByLabelText("Submit");
        user.type(usernameInput, testUsername);
        user.type(passwordInput, testPassword);
        await user.click(submitButton);

        mockAxios.mockResponse({
            status: 401,
            data: {
                message: testMessage,
            },
        });

        const errorMessage = getByText(testMessage);
        expect(errorMessage).toBeInTheDocument();
    });
});
