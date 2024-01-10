import { useUser } from "@/hooks/useUser";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TutorInfo from "@/components/OfferScreen/TutorInfo/TutorInfo";
import OtherOfferts from "@/components/OfferScreen/OtherOfferts/OtherOfferts";
import OfferDescription from "@/components/OfferScreen/OfferDescription/OfferDescription";
import { Col, Flex, Row } from "antd";
import PageHeader from "@/components/PageHeader/PageHeader";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LessonsCalendar from "@/components/OfferScreen/LessonsCalendar/LessonsCalendar";

interface OfferDescriptionData {
    name: string;
    description: string;
    teacher_id: number;
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
    const { loading } = useUser({
        loggedIn: false,
        redirectTo: "/",
    });

    const [offerData, setDescriptionData] = useState<OfferDescriptionData>({
        name: "",
        description: "",
        teacher_id: 0,
    });

    const [tutorData, setTutorData] = useState<TutorData>({
        name: "",
        surname: "",
        pictureURL: "",
    });

    const [allTutorsOffers, setAllTutorsOffers] = useState<AllTutorsOffers>({
        indexes: [],
    });


    const router = useRouter();
    const { id } = router.query;
    // useEffect(() => {
    //
    //  axios
    //     .get(`/api/offers/${id}`)
    //     .then((res) => {
    //         console.log(res.data);
    //         const name = res.data.name;
    //         const description = res.data.description;
    //         const teacher_id = res.data.teacher_id;
    //         setDescriptionData({name, description, teacher_id});
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    //
    // axios
    //     .get(`/api/users/${offerData.teacher_id}`)
    //     .then((res) => {
    //         console.log(res.data);
    //         const name = res.data.name;
    //         const surname = res.data.surname;
    //         const pictureURL = res.data.pictureURL;
    //         setTutorData({name, surname, pictureURL});
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    //
    // axios
    //     .get(`/api/users/offers?teacher_id=${offerData.teacher_id}`)
    //     .then((res) => {
    //         console.log(res.data);
    //         const indexes = res.data;
    //         setAllTutorsOffers({indexes});
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }, []);

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
                    <LessonsCalendar />
                </div>
            </Col>
            <Col span={12} offset={1}>
                <Flex justify="center" align="center">
                <OfferDescription offerName={offerData.name} offerDescription={offerData.description}/>
                </Flex>
            </Col>
                <Col span={4} offset={1} style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "top",
                    }}
                >
                    <div style={{transform: "translateY(14%)"}}>
                        <TutorInfo pictureURL={tutorData.pictureURL} name={tutorData.name} surname={tutorData.surname}/>
                        <OtherOfferts  offersData={allTutorsOffers.indexes}/>
                    </div>
                </Col>

        </Row>
        </div>
    );
}