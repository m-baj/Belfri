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
    pictureURL: string;
}

interface AllTutorsOffers {
    indexes: number[];
}

export default function Loader() {
    const { loading } = useUser({});

    const [offerDescriptionData, setDescriptionData] = useState<OfferDescriptionData>({
        name: "",
        description: "",
        teacherID: 0
    });

    const [tutorData, setTutorData] = useState<TutorData>({
        name: "",
        surname: "",
        pictureURL: ""
    });

    const router = useRouter();
    const { id } = router.query;
    // useEffect(() => {
    //
    //     axios
    //         .get(`/api/offers/${id}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             const name = res.data.name;
    //             const description = res.data.description;
    //             const teacher_id = res.data.teacher_id;
    //             console.log(teacher_id)
    //             setDescriptionData({ name, description, teacher_id });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             message.error("${err.message}");
    //         });
    //
    //     axios
    //         .get(`/api/teachers/${offerData.teacher_id}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             const name = res.data.name;
    //             const surname = res.data.surname;
    //             const pictureURL = res.data.pictureURL;
    //             setTutorData({ name, surname, pictureURL });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             message.error("${err.message}");
    //         });
    // });

    const loadData = async () => {
        try {
            const offerResponse = await axios.get(`/api/offers/${id}`, { withCredentials: true, timeout: 5000 });
            console.log(offerResponse);
            const teacherResponse = await axios.get(`/api/teacher/${offerResponse.data.data.teacherID}`, {
                withCredentials: true,
                timeout: 5000
            });
            setTutorData({
                name: teacherResponse.data.data.name,
                surname: teacherResponse.data.data.surname,
                pictureURL: teacherResponse.data.data.pictureURL
            });

            setDescriptionData({
                name: offerResponse.data.data.name,
                description: offerResponse.data.data.description,
                teacherID: offerResponse.data.data.teacherID
            });

        } catch (err: any) {
            console.log(err);
            message.error(`${err.message}`);
        }
    };

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

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
                    justifyContent: "top"
                }}
                >
                    <div style={{ transform: "translateY(23%)" }}>
                        <LessonsCalendar />
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
                    <div style={{ transform: "translateY(14%)" }}>
                        <TutorInfo pictureURL={tutorData.pictureURL} name={tutorData.name}
                                   surname={tutorData.surname} />
                        <OfferList teacherID={offerDescriptionData.teacherID} compact={true} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}