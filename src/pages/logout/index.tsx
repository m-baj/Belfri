import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
    const router = useRouter(); 
    useEffect(()=>{
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        router.push("/login");
    }, [router])
    return <></>;
}