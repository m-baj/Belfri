import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        const { token } = router.query;
        axios
            .post("/api/user/activate", { token })
            .then((res) => {
                message.success(res.data.message);
                router.push("/login");
            })
            .catch((err) => {
                message.error(err.response.data.message);
                router.push("/login");
            });
    }, [router]);
    return <></>;
}
