import "@testing-library/jest-dom";
import React, { use } from "react";
import LoginForm from "./LoginForm";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";
import mockRouter from "next-router-mock";
import "@/utils/tests/setupTests";
import { sha256 } from "js-sha256";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

afterEach(() => {
    mockAxios.reset();
});

describe("LoginForm", () => {
    it("renders", () => {
        render(<LoginForm />);
    });

    it("renders a form", () => {
        const { getByTestId } = render(<LoginForm />);
        const form = getByTestId("login-form");
        expect(form).toBeInTheDocument();
    });

    it("renders correct fields", () => {
        const { getByPlaceholderText, getByText } = render(<LoginForm />);
        const username = getByPlaceholderText("Username");
        const password = getByPlaceholderText("Password");
        const submit = getByText("Submit");
        const rememberme = getByText("Remember me");
        const forgotpassword = getByText("Forgot password?");
        const register = getByText("Register");

        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
        expect(rememberme).toBeInTheDocument();
        expect(forgotpassword).toBeInTheDocument();
        expect(register).toBeInTheDocument();
    });

    it("redirects to / on successful login", async () => {
        const user = userEvent.setup();

        const testPassword = "Admin123@#!";
        const testUsername = "admin";

        const { getByPlaceholderText, getByText } = render(<LoginForm />);

        const usernameInput = getByPlaceholderText("Username");
        const passwordInput = getByPlaceholderText("Password");
        const submitButton = getByText("Submit");

        user.type(usernameInput, testUsername);
        user.type(passwordInput, testPassword);
        await user.click(submitButton);

        expect(mockAxios.post).toHaveBeenCalledWith("/api/login/", {
            username: testUsername,
            passHash: sha256(testPassword),
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
        const { getByPlaceholderText, getByText } = render(<LoginForm />);

        const usernameInput = getByPlaceholderText("Username");
        const passwordInput = getByPlaceholderText("Password");
        const submitButton = getByText("Submit");

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
