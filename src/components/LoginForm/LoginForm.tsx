import style from "./LoginForm.module.css";
import { Form, Flex, Button, Checkbox, Typography, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import axios from "axios";
import {sha256,} from 'js-sha256'
import message from "antd";
import { useRouter } from "next/router";

interface Fields {
    username?: string;
    password?: string;
    remember?: boolean;
}

export default function LoginForm() {
    const [form] = Form.useForm();
    const router = useRouter();
    
    const handleForm = (values: any) => {
        axios.get("/api/login/", {
            data: {
                username: values.username,
                passwordHash: sha256(values.password),
            },
        }).then((res) => {
            if(res.status == 200){
                const token = res.data.token;
                sessionStorage.setItem("token", token);
                router.push("/");
            } else if (res.status == 401) {
                form.setFields([
                    {
                        name: "password",
                        errors: [res.data.message],
                    },
                ]);
            }
            else {
                // message.error(res.data.message)
            }
        }
        ).catch((err) => {
            // message.error(err);
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
                            message: "Please input your username!",
                        },
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
                            message: "Please input your password!",
                        },
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
                        <Button className={style.rightAlignButton}type="link">Forgot password?</Button>
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
