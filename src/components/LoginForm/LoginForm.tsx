import style from "./LoginForm.module.css";
import { Form, Flex, Button, Checkbox, Typography, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";

interface Fields {
    username?: string;
    password?: string;
    remember?: boolean;
}


export default function LoginForm() {
    const [form] = Form.useForm();
    const handleForm = (values: any) => {
        console.log(values);
    };

    return (
        <Flex vertical>
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                {config.appName}
            </Typography.Title>

            <Form
                form={form}
                name="loginorm"
                className={style.LoginForm}
                initialValues={{ remember: true }}
                autoCapitalize="off"
                onFinish={handleForm}
            >
                <Form.Item<Fields>
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
                <Flex>
                    <Form.Item<Fields> name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item<Fields>>
                        <Button type="link">Forgot password?</Button>
                    </Form.Item>
                </Flex>
                <Flex vertical>
                    <Form.Item<Fields>>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="link">Register</Button>
                    </Form.Item>
                </Flex>
            </Form>
        </Flex>
    );
}
