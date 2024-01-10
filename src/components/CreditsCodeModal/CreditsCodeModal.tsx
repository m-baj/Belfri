import React, from 'react';
import { Button, Input, Modal } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export default function CreditsCodeModal(props: ModalProps) {

    const handleOk = () => {
        props.setOpen(false)
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
                    <Button key="back" size='small' onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" size='small' onClick={handleOk}>
                        Submit
                    </Button>
                ]}
                width={300}
            >
                <Input placeholder="Enter your credits code" prefix={<CreditCardOutlined style={{color: blue[4]}}/>} />
            </Modal>
    );
};
