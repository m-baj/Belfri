import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useUser } from "@/hooks/useUser";
import { AuthLevel } from "@/utils/etc/AuthLevel";

export default function Decline() {
    useUser({
        requiredAuthLevel: AuthLevel.TUTOR
    });
    const router = useRouter();
    const id = router.query.id;
    useEffect(() => {
        axios
            .post("/api/lesson/respond", {
                lessonID: id,
                accept: false
            }, { withCredentials: true })
            .then(() => {
                message.success("Lesson declined");
            })
            .catch((err) => {
                console.log(err);
                message.error("Lesson decline failed");
            }).finally(() => {
            router.push("/");
        });
    }, [router]);
    return <></>;
}
