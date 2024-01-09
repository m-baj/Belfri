import { useUser } from "@/hooks/useUser";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
// import OfferDescription from "@/components/OfferScreen/OfferDescription/OfferDescription";
import TutorInfo from "@/components/OfferScreen/TutorInfo/TutorInfo";
import TutorDescribtion from "@/components/OfferScreen/TutorDescription/TutorDescription";
import OtherOfferts from "@/components/OfferScreen/OtherOfferts/OtherOfferts";
import OfferDescription from "@/components/OfferScreen/OfferDescription/OfferDescription";
import { Col, Flex, Grid, Row } from "antd";
import PageHeader from "@/components/PageHeader/PageHeader";

export default function Loader() {
    const { loading } = useUser({
        loggedIn: false,
        redirectTo: "/",
    });
    if (loading) return <LoadingComponent />;
    return (
        <div>
        <Row>
            <PageHeader />
        </Row>
        <Row justify="center">
            <Col span={4} style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "top",
            }}
            >
                <div style={{transform: "translateY(23%)"}}>
                    <OtherOfferts />
                </div>
            </Col>
            <Col span={12} offset={1}>
                <Flex justify="center" align="center">
                <OfferDescription />
                </Flex>
            </Col>
                <Col span={4} offset={1} style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "top",
                    }}
                >
                    <div style={{transform: "translateY(14%)"}}>
                        <TutorInfo />
                    </div>
                </Col>

        </Row>
        </div>
    );
}