import { useUser } from "@/hooks/useUser";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TutorInfo from "@/components/OfferScreen/TutorInfo/TutorInfo";
import OfferDescription from "@/components/OfferScreen/OfferDescription/OfferDescription";
import { Col, Flex, message, Row } from "antd";
import PageHeader from "@/components/PageHeader/PageHeader";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LessonsCalendar from "@/components/OfferScreen/LessonsCalendar/LessonsCalendar";
import OfferList from "@/components/OfferList/OfferList";

interface OfferDescriptionData {
    name: string;
    description: string;
    teacherID: number;
}

interface TutorData {
    name: string;
    surname: string;
    pictureBase64: string;
}

interface AllTutorsOffers {
    indexes: number[];
}

export default function Loader() {
    const { loading } = useUser({});
    const [fetching, setFetching] = useState<boolean>(true);
    const [offerDescriptionData, setDescriptionData] = useState<OfferDescriptionData>({
        name: "",
        description: "",
        teacherID: 0
    });

    const [tutorData, setTutorData] = useState<TutorData>({
        name: "",
        surname: "",
        pictureBase64: ""
    });


    const router = useRouter();
    const { id } = router.query;

    const loadData = async () => {
        try {
            const offerResponse = await axios.get(`/api/offers/${id}`, { withCredentials: true, timeout: 5000 });
            const teacherResponse = await axios.get(`/api/teacher/${offerResponse.data.data.teacherID}`, {
                withCredentials: true,
                timeout: 5000
            });
            setTutorData({
                name: teacherResponse.data.data.name,
                surname: teacherResponse.data.data.surname,
                pictureBase64: teacherResponse.data.data.profilePicture
            });

            setDescriptionData({
                name: offerResponse.data.data.name,
                description: offerResponse.data.data.description,
                teacherID: offerResponse.data.data.teacherID
            });

            setFetching(false);

        } catch (err: any) {
            console.log(err);
            message.error(`${err.message}`);
        }
    };

    useEffect(() => {
        if (loading) return;
        if (id) {
            loadData();
        }
    }, [id, loading]);

    if (loading || fetching) return <LoadingComponent />;
    return (
        <div>
            <Row>
                <PageHeader />
            </Row>
            <Row justify="center">
                <Col span={4} style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "top"
                }}
                >
                    <div style={{ transform: "translateY(70px)" }}>
                        <LessonsCalendar OfferID={
                            Number(id)
                        } TeacherID={
                            offerDescriptionData.teacherID
                        } />
                    </div>
                </Col>
                <Col span={12} offset={1}>
                    <Flex justify="center" align="center">
                        <OfferDescription offerName={offerDescriptionData.name}
                                          offerDescription={offerDescriptionData.description} />
                    </Flex>
                </Col>
                <Col span={4} offset={1} style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "top"
                }}
                >
                    <div style={{ transform: "translateY(70px)" }}>
                        <TutorInfo pictureBase64={tutorData.pictureBase64} name={tutorData.name}
                                   surname={tutorData.surname} />
                        <OfferList teacherID={offerDescriptionData.teacherID} compact={true} skip={Number(id)} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}