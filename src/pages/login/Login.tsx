import LoginForm from "@/components/LoginForm/LoginForm";
import React from "react";
import { Flex } from "antd";

export default function Login() {
    return (
        <Flex justify="center" align="center">
            <LoginForm />
        </Flex>
    );
}
