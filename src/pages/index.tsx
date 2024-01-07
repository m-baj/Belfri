import PageHeader from "@/components/PageHeader/PageHeader";
import { useUser } from "@/hooks/useUser";
import { Divider } from "antd";
import Link from "next/link";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

export default function Home() {
    const { token, username, loading } = useUser();
    if(loading){
        return <LoadingComponent/>
    }

    return (
        <body style={{ margin: 0 }}>
            <PageHeader />
            <Divider style={{ margin: 0 }} />
             {username} : {token}<br />
            <Link href="/logout">Logout</Link>
        </body>
    );
}
