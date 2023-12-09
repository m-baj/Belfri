import PageHeader from "@/components/PageHeader/PageHeader";
import { useUser } from "@/hooks/useUser";
import { Flex } from "antd";
import Link from "next/link";


export default function Home() {
    const { token, username } = useUser();
    return (
        <Flex vertical>
            <PageHeader />
            <Flex>
            {username} : {token}<br />
            <Link href="/logout">Logout</Link>
            </Flex>
        </Flex>
    );
}
