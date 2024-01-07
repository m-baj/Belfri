import { Button, Flex, message, Typography } from "antd";
import { blue } from "@ant-design/colors";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AccountActivationScreen() {

    const [messageApi, contextHolder] = message.useMessage();
    let lastSentTime = 0;
    const router = useRouter();
    const email = router.query.email;
    const token = router.query.token;
    const name = router.query.name;

    const error = () => {
        messageApi.open({
            type: "error",
            content: "You can send email again in 30 seconds.",
            duration: 5,
        });
    }

    const sendEmail = () => {

        const currentTimestamp = new Date().getTime();
        const timeDifference = currentTimestamp - lastSentTime;
        console.log(timeDifference);
        if (timeDifference < 30000) {
            return messageApi.error("You can send email again in 30 seconds.");
        }

        axios
            .post("/api/user/send-activation-email", {
                "name": name,
                "email": email,
                "activation_token": token,
            })
            .then((response) => {
                if (response.status === 200) {
                    messageApi.success("Email sent.");
                }
            })
            .catch((error) => {
                message.error("Error: " + error.response.data.message);
            });
    }
    useEffect(() => {
        sendEmail();
    })

    return (
        <Flex vertical align="center" style={{ height: "100vh", width: "600"}}>
            <div>
                <Typography.Title level={2} style={{color: blue[4], textAlign: "center"}}>
                    Account activation
                </Typography.Title>
                <Typography.Text style={{ textAlign: "center"}}>
                    We have sent you an email on address you provided in registration form.
                    Please check your inbox and click on the link to activate your account.
                </Typography.Text>
                <Flex justify="center">
                    <Button type="primary" onClick={sendEmail}>
                        Send email again
                    </Button>
                </Flex>
            </div>
        </Flex>
    );
}