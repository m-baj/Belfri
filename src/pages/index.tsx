import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function Home() {
    const { token, username } = useUser();
    return (
        <>
            {username} : {token} <br />
            <Link href="/logout">Logout</Link>
        </>
    );
}
