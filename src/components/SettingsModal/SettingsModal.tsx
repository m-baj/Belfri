import React from "react";
import { Modal, Button } from "antd";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function SettingsModal(props: ModalProps) {
    return (
        <Modal
            open={props.open}
            title="Settings"
            onCancel={() => props.setOpen(false)}
            footer={null}
            width={300}
        >
            <Button
                type="primary"
                onClick={() => {
                    if (typeof window !== "undefined") {
                        window.location.href = "/logout";
                    }
                }}
            >
                Logout
            </Button>
        </Modal>
    )
}