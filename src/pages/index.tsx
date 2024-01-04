import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

export default function Home() {
    const { token, username , loading} = useUser();
    if(loading){
        return <LoadingComponent/>
    }
    return (
        <>
            {username} : {token} <br />
            <Link href="/logout">Logout</Link>
        </>
    );
}
