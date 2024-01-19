import React from "react";
import { Modal, Button } from "antd";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";
import { AuthLevel } from "@/utils/etc/AuthLevel";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function SettingsModal(props: ModalProps) {
    const router = useRouter();
    const { auth } = useUser();
    return (
        <Modal
            open={props.open}
            title="Settings"
            onCancel={() => props.setOpen(false)}
            footer={null}
            width={300}
        >
            {auth && auth >= AuthLevel.TUTOR ? (<>
                <Button
                    onClick={() => {
                        router.push("/createOffer");
                        props.setOpen(false);
                    }}
                >
                    Add Offer
                </Button> <br /><br />
                <Button
                    onClick={() => {
                        router.push("/doneLessons");
                        props.setOpen(false);
                    }}
                >
                    View Done Lessons
                </Button> <br /><br /></>) : null}
            <Button
                type="primary"
                onClick={() => {
                    router.push("/logout");
                    props.setOpen(false);
                }}
            >
                Logout
            </Button>
        </Modal>
    );
}