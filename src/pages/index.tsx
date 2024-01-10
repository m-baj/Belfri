import PageHeader from "@/components/PageHeader/PageHeader";
import { useUser } from "@/hooks/useUser";
import { Divider, Flex } from "antd";
import Link from "next/link";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import OfferList from "@/components/OfferList/OfferList";
import React from "react";

export default function Home() {
    const { token, username, loading } = useUser();
    if(loading){
        return <LoadingComponent/>
    }

    return (
        <body style={{ margin: 0 }}>
            <PageHeader />
            <Flex justify="center" align="flex-top">
                <OfferList compact={false} />
            </Flex>
            <Divider style={{ margin: 0 }} />
             {username} : {token}<br />
            <Link href="/logout">Logout</Link>
        </body>
    );
}
