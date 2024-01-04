import style from "./TeacherRegistrationForm.module.css";
import {
    Form,
    Flex,
    Button,
    Checkbox,
    Typography,
    Input,
    message,
    Select,
    DatePicker,
    Upload,
} from "antd";
import {
    EditOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    UnlockOutlined,
    UserOutlined,
    UserAddOutlined,
    PictureOutlined,
    BankOutlined
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { useRouter } from "next/router";
import Password from "antd/es/input/Password";
import { PasswordInput } from "antd-password-input-strength";
import { useState } from "react";
import { Option } from "antd/lib/mentions";

interface Fields {
    name?: string;
    surname?: string;
    gender?: string;
    email?: string;
    phoneNumber?: string;
    username?: string;
    password?: string;
    passwordConfirm?: string;
    subject?: string;
    education?: string;
    teachingLevel?: string;
    dateOfBirth?: string;
    iban?: string;
    acceptTerms?: boolean;
    acceptPrivacyPolicy?: boolean;
    acceptMarketing?: boolean;
}

export default function TeacherRegistrationForm() {
    const [form] = Form.useForm();
    const router = useRouter();

    const handleForm = (values: any) => {
        console.log(values);
        // router.push("/login");
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="48">+48</Option>
                <Option value="49">+49</Option>
            </Select>
        </Form.Item>
    );

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

    const validateEmail = (rule: any, value: any, callback: any) => {
        if (value && !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
            callback("Invalid email address");
        } else {
            callback();
        }
    }

    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current > new Date();
    };

    const validateIban = (rule: any, value: any, callback: any) => {
        if (value && !/^[a-zA-Z]{2}[0-9]{26}$/.test(value)) {
            callback("Invalid IBAN");
        } else {
            callback();
        }
    }

    return (
        <Flex vertical>
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                Create teacher account
            </Typography.Title>

            <Form
                data-testid="teacher-registration-form"
                form={form}
                name="teacher-registration-form"
                className={style.teacherRegForm}
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
                        prefix={<EditOutlined style={{ color: blue[4] }} />}
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
                        prefix={<EditOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Please input your gender!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Select your gender"
                        size="large"
                        onChange={handleForm}
                        options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                        ]}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                        {
                            validator: validateEmail,
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Email"
                        prefix={<MailOutlined style={{ color: blue[4] }} />}
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
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Phone number"
                        prefix={<PhoneOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
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
                        prefix={<UserAddOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                        {
                            validator: validatePassword,
                        },
                    ]}
                >
                    <PasswordInput
                        size="large"
                        placeholder="Password"
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
                    name="subject"
                    rules={[
                        {
                            required: true,
                            message: "Please input your subject!",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        style={{ width: style.width }}
                        placeholder="Select subjects"
                        size="large"
                        onChange={handleForm}
                        options={[
                            { value: "math", label: "Math" },
                            { value: "science", label: "Science" },
                            { value: "english", label: "English" },
                            { value: "history", label: "History" },
                            { value: "geography", label: "Geography" },
                            { value: "music", label: "Music" },
                            { value: "art", label: "Art" },
                            {
                                value: "computerScience",
                                label: "Computer Science",
                            },
                            {
                                value: "physicalEducation",
                                label: "Physical Education",
                            },
                            { value: "other", label: "Other" },
                        ]}
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
                    <Select
                        style={{ width: style.width }}
                        placeholder="Select education"
                        size="large"
                        onChange={handleForm}
                        options={[
                            { value: "primary", label: "Primary" },
                            { value: "secondary", label: "Secondary" },
                            { value: "high", label: "High" },
                        ]}
                    />
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
                    <Select
                        mode="multiple"
                        style={{ width: style.width }}
                        placeholder="Select teaching level"
                        size="large"
                        onChange={handleForm}
                        options={[
                            { value: "primary", label: "Primary" },
                            { value: "secondary", label: "Secondary" },
                            { value: "high", label: "High" },
                        ]}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="dateOfBirth"
                    style={{ width: style.width }}
                    rules={[
                        {
                            required: true,
                            message: "Please input your date of birth!",
                        },
                    ]}
                >
                    <DatePicker
                        size="large"
                        placeholder="Date of birth"
                        onChange={handleForm}
                        style={{ width: "100%" }}
                        prefixCls="ant-picker"
                        disabledDate={disabledDate}
                    />
                </Form.Item>
                <Form.Item
                    name="uploadiban"
                    rules={[
                        {
                            required: true,
                            message: "Please upload your iban"
                        },
                        {
                            validator: validateIban
                        }
                    ]}

                >
                    <Input
                        size="large"
                        placeholder="IBAN"
                        prefix={<BankOutlined style={{ color: blue[4] }} />}
                    />

                </Form.Item>
                <Form.Item
                    name="uploadProfilePicture"
                    rules={[
                        {
                            required: true,
                            message: "Please upload your profile picture!",
                        },
                    ]}
                >
                    <Upload
                        name="profilePicture"
                        action="/upload.do"
                        listType="picture"
                        maxCount={1}
                        onChange={handleForm}
                        style={{ width: style.width }}
                    >
                        <Button
                            icon={
                                <PictureOutlined style={{ color: blue[4] }} />
                            }
                        >
                            Upload profile picture
                        </Button>
                    </Upload>
                </Form.Item>
                <Flex vertical align="left">
                    <Form.Item<Fields>
                        style={{ marginBottom: "0px" }}
                        name="acceptPrivacyPolicy"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: "Please accept privacy policy!",
                            },
                        ]}
                    >
                        <Checkbox required>
                            I accept the <a href="#">privacy policy</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item<Fields>
                        style={{ marginBottom: "0px" }}
                        name="acceptTerms"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: "Please accept terms!",
                            },
                        ]}
                    >
                        <Checkbox required>
                            I accept the <a href="#">terms and conditions</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item<Fields>
                        name="acceptMarketing"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: "Please accept marketing!",
                            },
                        ]}
                    >
                        <Checkbox>
                            I accept to receive marketing information
                        </Checkbox>
                    </Form.Item>
                </Flex>

                <Form.Item<Fields>>
                    <Flex vertical>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button
                            className={style.rightAlignButton}
                            type="link"
                            onClick={() => router.push("/login")}
                            style={{ marginTop: "0px" }}
                        >
                            Login
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    );
}
