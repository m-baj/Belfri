import PageHeader from "@/components/PageHeader/PageHeader";
// import { useUser } from "@/hooks/useUser";
import { blue } from "@ant-design/colors";
import { Layout } from "antd";
import Link from "next/link";
// import { useEffect, useState } from "react";


const { Header, Footer, Content } = Layout;


export default function Home() {
    // const { token, username } = useUser();

    return (
        <body style={{ margin: 0 }}>
            <Header style={{ height: '120px', background: '#e6f7ff', padding: 0 }}>
                <PageHeader />
            </Header>
            <Content>
                {/* {username} : {token}<br /> */}
                <Link href="/logout">Logout</Link>
            </Content>
        </body>
    );
}
