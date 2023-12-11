import { useRouter } from "next/router";
import { useEffect } from "react";
import jscookie from "js-cookie";
import axios from "axios";
import { message } from "antd";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        axios
            .post("/api/logout", { withCredentials: true })
            .then(() => {
                jscookie.remove("token");
                jscookie.remove("username");

                router.push("/login");
            })
            .catch((e) => {
                message.error("Couldn't logout: ", e.response.data.message);
            });
    }, [router]);
    return <></>;
}
