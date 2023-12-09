import Header from "@/components/Header/Header";
import { useUser } from "@/hooks/useUser";
import { Flex } from "antd";
import Link from "next/link";

export default function Home() {
    const { token, username } = useUser();
    return (
        <Flex>
            <Header />
            <br>{username} : {token}</br>
            <Link href="/logout">Logout</Link>
        </Flex>
    );
}
