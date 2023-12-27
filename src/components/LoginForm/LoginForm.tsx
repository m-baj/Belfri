import style from "./LoginForm.module.css";
import { Form, Flex, Button, Checkbox, Typography, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import axios from "axios";
import { sha256 } from "js-sha256";
import { useRouter } from "next/router";
import jscookie from "js-cookie";

interface Fields {
    username?: string;
    password?: string;
    remember?: boolean;
}

export default function LoginForm() {
    const [form] = Form.useForm();
    const router = useRouter();

    const handleForm = (values: any) => {
        axios
            .post("/api/login/", {
                username: values.username,
                passHash: sha256(values.password),
                remember: values.remember
            })
            .then((res) => {
                if (res.status == 200) {
                    const token = res.data.token;
                    const expiration_date = res.data.expiration_date;
                    const auth_level = res.data.auth_level;
                    const options = {
                        expires: values.remember ? 7 : undefined
                    };
                    jscookie.set("token", token, options);
                    jscookie.set("username", values.username, options);
                    jscookie.set("expiration", expiration_date, options);
                    jscookie.set("auth_level", auth_level, options);

                    const next = router.query.next;
                    if (next) {
                        router.push(next as string);
                        return;
                    }
                    router.push("/");
                } else {
                    message.error("Login failed");
                }
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    form.setFields([
                        {
                            name: "password",
                            errors: [err.response.data.message]
                        }
                    ]);
                } else {
                    message.error(
                        "Login failed due to server error: " +
                        err.response.status +
                        " " +
                        err.response.data.message
                    );
                }
            });
    };

    return (
        <Flex vertical>
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                {config.appName}
            </Typography.Title>

            <Form
                data-testid="login-form"
                form={form}
                name="loginorm"
                className={style.LoginForm}
                initialValues={{ remember: true }}
                autoCapitalize="off"
                onFinish={handleForm}
            >
                <Form.Item<Fields>
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!"
                        }
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Username"
                        prefix={<UserOutlined color="blue" />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!"
                        }
                    ]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Password"
                        prefix={<LockOutlined color="blue" />}
                    />
                </Form.Item>
                <Flex justify="space-evenly">
                    <Form.Item<Fields> name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item<Fields>>
                        <Button className={style.rightAlignButton} type="link">
                            Forgot password?
                        </Button>
                    </Form.Item>
                </Flex>
                <Form.Item<Fields>>
                    <Flex vertical>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="link">Register</Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    );
}
