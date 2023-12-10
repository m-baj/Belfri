import PageHeader from "@/components/PageHeader/PageHeader";
import { useUser } from "@/hooks/useUser";
import { blue } from "@ant-design/colors";
import { Flex, Layout } from "antd";
import Link from "next/link";


const { Header, Footer, Content } = Layout;


export default function Home() {
    const { token, username } = useUser();
    return (
        <body style={{ margin: 0 }}>
            <Header style={{ height: '100px', background: blue[1], padding: 0 }}>
                <PageHeader />
            </Header>
            <Content>
                {username} : {token}<br />
                <Link href="/logout">Logout</Link>
            </Content>
        </body>
    );
}
