import LoginForm from "@/components/LoginForm/LoginForm";
import React from "react";
import { Flex } from "antd";

export default function Login() {
    return (
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }}>
        <Flex justify="center" align="center">
            <LoginForm />
        </Flex>
        </div>
    );
}
