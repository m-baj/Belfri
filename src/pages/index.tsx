import PageHeader from "@/components/PageHeader/PageHeader";
import { useUser } from "@/hooks/useUser";
import { Col, Divider, Row, Typography } from "antd";
import Link from "next/link";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import OfferList from "@/components/OfferList/OfferList";
import { blue } from "@ant-design/colors";

export default function Home() {
    const { token, username, loading } = useUser();
    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <body style={{ margin: 0 }}>
        <PageHeader />
        <Typography.Title style={{ textAlign: "center" }} level={2}> Latest offers </Typography.Title>
        <Row>
            <Col span={12} offset={6}>
                <   OfferList />
            </Col>
        </Row>
        </body>
    );
}
