import { Button, Flex, message, Statistic, Typography } from "antd";
import { blue } from "@ant-design/colors";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AccountActivationScreen() {

    const router = useRouter();
    const email = router.query.email;
    const token = router.query.token;
    const name = router.query.name;

    const [formLoading, setFormLoading] = useState(true);
    const sendEmail = () => {
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

        setFormLoading(true);
    }

    return (
        <Flex vertical align="center">
                <Typography.Title level={2} style={{color: blue[4], textAlign: "center"}}>
                    Account activation
                </Typography.Title>
                <Typography.Text style={{ textAlign: "center"}}>
                    We have sent you an email on address you provided in registration form. <br/>
                    Please check your inbox and click on the link to activate your account. <br/> <br/>
                </Typography.Text>
                <Flex justify="center">
                    <Button type="primary" onClick={sendEmail} disabled={formLoading}>
                        {formLoading ? <Statistic.Countdown
                            valueStyle={{ fontSize: "12pt" }}
                            prefix={"Resend email in "}
                            format="s"
                            suffix={"s"}
                            value={Date.now() + 30000}
                            onFinish={() => setFormLoading(false)}
                        /> : "Resend email"}
                    </Button>
                </Flex>
        </Flex>

    );
}