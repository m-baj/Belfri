import StudentRegistrationForm from "@/components/StudentRegistrationForm/StudentRegistrationForm";
import { Flex } from "antd";

export default function StudenRegistration() {
    return (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
            <div>
                <StudentRegistrationForm />
            </div>
        </Flex>
    );
}
