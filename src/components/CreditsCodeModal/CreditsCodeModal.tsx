import React from "react";
import { Button, Input, message, Modal } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import axios from "axios";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function CreditsCodeModal(props: ModalProps) {
    const [creditsCode, setCreditsCode] = React.useState<string>("");

    const handleOk = async () => {
        try {
            const response = await axios.put("/api/credits/claim", {
                token: creditsCode
            }, { withCredentials: true });
            console.log("API response", response.data);

            message.success("Credits claimed successfully!");

            props.setOpen(false);
        } catch (error) {
            console.error("API error", error);

            message.error("Credits code is invalid!");

            props.setOpen(false);
        }
    };

    const handleCancel = () => {
        props.setOpen(false);
    };

    return (
        <Modal
            open={props.open}
            title="Add credits code"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" size="small" onClick={handleCancel}>
                    Return
                </Button>,
                <Button key="submit" type="primary" size="small" onClick={handleOk}>
                    Submit
                </Button>
            ]}
            width={300}
        >
            <Input
                placeholder="Enter your credits code"
                prefix={<CreditCardOutlined style={{ color: blue[4] }} />}
                value={creditsCode}
                onChange={(e) => setCreditsCode(e.target.value)}
            />
        </Modal>
    );
};
