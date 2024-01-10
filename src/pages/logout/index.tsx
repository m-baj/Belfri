import { useRouter } from "next/router";
import { useEffect } from "react";
import jscookie from "js-cookie";
import axios from "axios";
import { message } from "antd";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        axios
            .post("/api/user/logout", { withCredentials: true })
            .then(() => {
                jscookie.remove("token");
                jscookie.remove("username");
                jscookie.remove("expiration");
                jscookie.remove("auth_level");

                router.push("/login");
            })
            .catch((err) => {
                console.log(err);
                jscookie.remove("token");
                jscookie.remove("username");
                router.push("/login");
            });
    }, [router]);
    return <></>;
}
