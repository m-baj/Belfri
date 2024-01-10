import PageHeader from "@/components/PageHeader/PageHeader";
import { useUser } from "@/hooks/useUser";
import { Col, Divider, Row, Typography } from "antd";
import Link from "next/link";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import OfferList from "@/components/OfferList/OfferList";
import { blue } from "@ant-design/colors";
import { useRouter } from "next/router";

export default function Home() {
    const { token, username, loading } = useUser();
    const router = useRouter();
    if(loading){
        return <LoadingComponent/>
    }


    if (typeof router.query.search === "string" && typeof router.query.city === "string") {
        console.log(typeof router.query.search);
        console.log(router.query.search);
        console.log(typeof router.query.city);
        console.log(router.query.city);

        return (
            <body style={{ margin: 0 }}>
                <PageHeader />
                <Typography.Title level={2} style={{ textAlign: "center"}}> Search results for {router.query.search}</Typography.Title>
                <Row>
                    <Col span={12} offset={6}>
                        <OfferList search_or_teacherID={true} search={router.query.search} city={router.query.city}/>
                    </Col>
                </Row>
            </body>
        );
    }
    else {
        return (
            <body style={{ margin: 0 }}>
            <PageHeader />
            <Typography.Title level={2} style={{ textAlign: "center" }}> Latest offers </Typography.Title>
            <Row>
                <Col span={12} offset={6}>
                    <OfferList />
                </Col>
            </Row>
            </body>
        );
    }
}
