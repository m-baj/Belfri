import {
    Checkbox,
    DatePicker,
    Flex,
    Form,
    Input,
    Button,
    Typography,
    Space, message
} from "antd";
import { useRouter } from "next/router";
import style from "./StudentRegistrationForm.module.css";
import {
    EditOutlined,
    LockOutlined,
    MailOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import { PasswordInput } from "antd-password-input-strength";
import axios from "axios";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { sha256 } from "js-sha256";

interface Fields {
    username?: string;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    birthdate?: string;
    acceptTerms?: boolean;
    acceptPrivacy?: boolean;
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

    const disabledDate: RangePickerProps["disabledDate"] = (current) => {
        // Can not select after today and today
        return current && current >= dayjs().endOf("day");
    };

    const sendEmail = (name: string, email: string, token: string) => {
        axios
            .post("/api/user/send-activation-email", {
                "name": name,
                "email": email,
                "activation_token": token,
            })
            .then((response) => {
                if (response.status === 200) {
                    message.success("Email sent");
                }
            })
            .catch((error) => {
                message.error("Error: " + error.response.data.message);
            });
    }

    const handleForm = (values: any) => {
        console.log(values);
        axios
            .post("/api/user/register/", {
                "name": values.name,
                "surname": values.surname,
                "username": values.username,
                "email": values.email,
                "passHash": sha256(values.password),
                "dateOfBirth": values.birthdate.format("YYYY-MM-DD"),
            })
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    console.log(res.data.activation_token);
                    sendEmail(values.name, values.email, res.data.activation_token)
                    router.push({
                        pathname: "/register/activate",
                        query: { email: values.email, token: res.data.activation_token, name: values.name },
                    }).then(r => console.log(r));
                }
            })
            .catch((err) => {
                console.log(err);
                message.error(err.response.data.message).then(r => console.log(r));
            });
    };

    return (
        <Flex vertical>
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                Create student account
            </Typography.Title>
            <Form
                data-testid="studentRegistrationForm"
                form={form}
                name="studentRegistrationForm"
                initialValues={{ remember: true }}
                autoCapitalize="off"
                className={style.studentRegForm}
                onFinish={handleForm}
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
                        className={style.input}
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
                        className={style.input}
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
                        className={style.input}
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
                        className={style.input}
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
                    style={{ width: "100%" }}
                >
                    <PasswordInput
                        className={style.input}
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
                        className={style.input}
                        placeholder="Confirm password"
                        size="large"
                        prefix={<LockOutlined style={{ color: blue[4] }} />}
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
                        className={style.input}
                        placeholder="Birth date"
                        size="large"
                        format={config.dateFormat}
                        style={{ width: "100%" }}
                        disabledDate={disabledDate}
                    />
                </Form.Item>
                <Flex vertical align="left">
                    <Form.Item<Fields>
                        style={{ marginBottom: "0px" }}
                        name="acceptTerms"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  "You have to accept terms and conditions"
                                              )
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>
                            I accept
                            <a href="/terms-and-conditions">
                                {" "}
                                Terms and Conditions
                            </a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item<Fields>
                        valuePropName="checked"
                        name="acceptPrivacy"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  "You have to accept privacy policy"
                                              )
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>
                            I accept
                            <a href="/privacy-policy"> Privacy Policy</a>
                        </Checkbox>
                    </Form.Item>
                </Flex>
                <Space direction="vertical" size={5} style={{ width: "100%" }}>
                    <Form.Item>
                        <Flex justify="center">
                            <Form.Item
                                style={{
                                    width: "100%",
                                    marginBottom: "0px",
                                    border: "none",
                                }}
                            >
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
                    <Form.Item>
                        <Flex justify="space-evenly">
                            <Form.Item>
                                <Button
                                    className={style.rightAlignButton}
                                    type="link"
                                    onClick={() => router.push("/login")}
                                    style={{ marginTop: "0px" }}
                                >
                                    Already have an account?
                                </Button>
                            </Form.Item>
                        </Flex>
                    </Form.Item>
                </Space>
            </Form>
        </Flex>
    );
}
