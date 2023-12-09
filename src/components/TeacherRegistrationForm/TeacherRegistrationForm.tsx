import style from "./TeacherRegistrationForm.module.css";
import { Form, Flex, Button, Checkbox, Typography, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

interface Fields {
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    repeatPassword?: string;
    subject?: string;
    education?: string;
    teachingLevel?: string;
    dateOfBirth?: string;
    acceptTerms?: boolean;
}

export default function TeacherRegistrationForm() {
    const [form] = Form.useForm();
    const handleForm = (values: any) => {
        console.log(values);
    };


    return (
        <Flex vertical>
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                <h1>Teacher Registration</h1>
            </Typography.Title>

            <Form
                data-testid="teacher-registration-form"
                form={form}
                name="teacher-registration-form"
                className={style.TeacherRegistrationForm}
                initialValues={{ acceptTerms: false }}
                autoCapitalize="off"
                onFinish={handleForm}
            >
                <Form.Item<Fields>
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Name"
                        prefix={<UserOutlined color="blue" />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="surname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your surname!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Surname"
                        prefix={<UserOutlined color="blue" />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Email"
                        prefix={<UserOutlined color="blue" />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Phone number"
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
                <Form.Item<Fields>
                    name="repeatPassword"
                    rules={[
                        {
                            required: true,
                            message: "Please repeat your password!",
                        },
                    ]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Repeat password"
                        prefix={<LockOutlined color="blue" />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="subject"
                    rules={[
                        {
                            required: true,
                            message: "Please input your subject!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Subject"
                        prefix={<UserOutlined color="blue" />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="education"
                    rules={[
                        {
                            required: true,
                            message: "Please input your education!",
                        },
                    ]}
                >
                </Form.Item>
                <Form.Item<Fields>
                    name="teachingLevel"
                    rules={[
                        {
                            required: true,
                            message: "Please input your teaching level!",
                        },
                    ]}
                >
                </Form.Item>
                <Form.Item<Fields>
                    name="dateOfBirth"
                    rules={[
                        {
                            required: true,
                            message: "Please input your date of birth!",
                        },
                    ]}
                >
                </Form.Item>

            </Form>
        </Flex>
    );
}
