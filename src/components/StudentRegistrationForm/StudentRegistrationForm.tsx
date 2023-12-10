import {
    Checkbox,
    DatePicker,
    Flex,
    Form,
    Input,
    Button,
    Typography,
} from "antd";
import { useRouter } from "next/router";
import style from "./StudentRegistrationForm.module.css";
import {
    EditOutlined,
    KeyOutlined,
    LockOutlined,
    MailOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import { PasswordInput } from "antd-password-input-strength";

interface Fields {
    username?: string;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    accessKey?: string;
    birthdate?: string;
    acceptTerms?: boolean;
}

export default function StudentRegistrationForm() {
    const [form] = Form.useForm();
    const router = useRouter();

    const validatePassword = (rule: any, value: any, callback: any) => {
        if (value && value.length < 8) {
            callback("Password must be at least 8 characters long");
        }
        if (value && !/\d/.test(value)) {
            callback("Password must contain at least one digit");
        }
        if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            callback("Password must contain at least one\nspecial character");
        } else {
            callback();
        }
    };

    return (
        <Flex vertical>
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                Register
            </Typography.Title>
            <Form
                data-testid="studentRegistrationForm"
                form={form}
                name="studentRegistrationForm"
                initialValues={{ remember: true }}
                autoCapitalize="off"
                className={style.studentRegForm}
            >
                <Form.Item<Fields>
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username",
                        },
                    ]}
                >
                    <Input
                        placeholder="Username"
                        size="large"
                        prefix={<UserOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name",
                        },
                    ]}
                >
                    <Input
                        placeholder="Name"
                        size="large"
                        prefix={<EditOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="surname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your surname",
                        },
                    ]}
                >
                    <Input
                        placeholder="Surname"
                        size="large"
                        prefix={<EditOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email",
                        },
                        {
                            type: "email",
                            message: "Please input valid email",
                        },
                    ]}
                >
                    <Input
                        placeholder="Email"
                        size="large"
                        prefix={<MailOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password",
                        },
                        {
                            validator: validatePassword,
                        },
                    ]}
                >
                    <PasswordInput
                        placeholder="Password"
                        size="large"
                        prefix={<LockOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="passwordConfirm"
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Passwords must be identical!")
                                );
                            },
                        }),
                    ]}
                    dependencies={["password"]}
                >
                    <Input.Password
                        placeholder="Confirm password"
                        size="large"
                        prefix={<LockOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="accessKey"
                    rules={[
                        {
                            required: true,
                            message: "Please input your access code",
                        },
                    ]}
                >
                    <Input
                        placeholder="Access key"
                        size="large"
                        prefix={<KeyOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="birthdate"
                    rules={[
                        {
                            required: true,
                            message: "Please input your birth date",
                        },
                    ]}
                >
                    <DatePicker
                        placeholder="Birth date"
                        size="large"
                        format={config.dateFormat}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="acceptTerms"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: "Please accept terms",
                        },
                    ]}
                >
                    {" "}
                    <Flex vertical align="center">
                        <Flex vertical align="left">
                            <Checkbox>
                                I accept
                                <a href="/terms-and-conditions">
                                    {" "}
                                    Terms and Conditions
                                </a>
                            </Checkbox>

                            <Checkbox>
                                I accept
                                <a href="/privacy-policy"> Privacy Policy</a>
                            </Checkbox>
                        </Flex>
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Flex justify="center">
                        <Form.Item style={{ width: "100%" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    );
}
