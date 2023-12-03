import LoginForm from "@/components/LoginForm/LoginForm";
import React from "react";
import { Flex } from "antd";

export default function Login() {
    return (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
            <div style={{
                transform: "translateY(-20%)",
            }}>
                <LoginForm />
            </div>
        </Flex>
    );
}
