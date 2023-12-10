import style from "./TeacherRegistrationForm.module.css";
import { Form, Flex, Button, Checkbox, Typography, Input, message, Select, DatePicker, Upload } from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined, UnlockOutlined, UserOutlined, UserAddOutlined, PictureOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

interface Fields {
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    username?: string;
    password?: string;
    repeatPassword?: string;
    subject?: string;
    education?: string;
    teachingLevel?: string;
    dateOfBirth?: string;
    accessCode?: string;
    acceptTerms?: boolean;
    acceptPrivacyPolicy?: boolean;
    acceptMarketing?: boolean;
}

export default function TeacherRegistrationForm() {
    const [form] = Form.useForm();
    const handleForm = (values: any) => {
        console.log(values);
    };


    return (
        <Flex vertical>
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                Teacher Registration
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
                        prefix={<MailOutlined color="blue" />}
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
                        prefix={<PhoneOutlined color="blue" />}
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
                        prefix={<UserAddOutlined color="blue" />}
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
                    <Select
                        mode="multiple"
                        style={{ width: 360 }}
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
                            { value: "computerScience", label: "Computer Science" },
                            { value: "physicalEducation", label: "Physical Education" },
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
                        style={{ width: 360 }}
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
                        style={{ width: 360 }}
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
                        style={{ width: 360 }}
                        prefixCls="ant-picker"
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
                        style={{ width: 360 }}
                    >
                        <Button icon={<PictureOutlined />}>Upload profile picture</Button>
                    </Upload>
                </Form.Item>
                <Form.Item<Fields>
                    name="accessCode"
                    rules={[
                        {
                            required: true,
                            message: "Please input your access code!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Access code"
                        prefix={<UnlockOutlined color="blue" />}
                    />
                </Form.Item>
                <Form.Item<Fields>
                    name="acceptTerms"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: "Please accept terms and conditions!",
                        },
                    ]}
                >
                    <Checkbox>
                        I have read the <a href="#">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item<Fields>
                    name="acceptPrivacyPolicy"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: "Please accept privacy policy!",
                        },
                    ]}
                >
                    <Checkbox>
                        I have read the <a href="#">privacy policy</a>
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
                        I have read the <a href="#">marketing policy</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item<Fields>>
                    <Flex vertical>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="link">Login</Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    );
}
