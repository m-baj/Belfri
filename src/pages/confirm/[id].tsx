import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useUser } from "@/hooks/useUser";
import { AuthLevel } from "@/utils/etc/AuthLevel";

export default function Accept() {
    const { loading } = useUser({
        requiredAuthLevel: AuthLevel.TUTOR
    });
    const router = useRouter();
    const id = router.query.id;
    useEffect(() => {
        if (loading) return;
        if (id == undefined) return;
        axios
            .post("/api/lesson/confirm/", {
                lessonID: id
            }, { withCredentials: true })
            .then(() => {
                message.success("Lesson confirmed. Tutor will be paid.");
            })
            .catch((err) => {
                console.log(err);
                message.error("Lesson confirmation failed");
            }).finally(() => {
            router.push("/");
        });
    }, [router, loading, id]);
    return <></>;
}
