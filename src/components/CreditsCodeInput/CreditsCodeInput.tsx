import React, { useState } from 'react';
import { Button, Input, Modal } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

export default function CreditsCodeInput() {
    // const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        //     setOpen(false);
        // }, 3000);
        // temporary solution
        setOpen(false)
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>modal</Button>
            <Modal
                open={open}
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
        </>
    );
};
