import { useRouter } from "next/router";
import { useEffect } from "react";
import jscookie from "js-cookie";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        jscookie.remove("token");
        jscookie.remove("username");

        router.push("/login");
    }, [router]);
    return <></>;
}
