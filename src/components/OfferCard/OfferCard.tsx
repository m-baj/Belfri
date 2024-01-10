import { Card, Typography, Row, Col, Avatar, Statistic, message, Skeleton } from "antd";
import { StarOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface OfferData {
    title?: string;
    description?: string;
    teacherID?: number;
    rating?: number;
    name?: string;
    surname?: string;
    picture?: string;
}

export interface OfferCardProps {
    id: number;
    compact?: boolean;
}

export default function OfferCard(props: OfferCardProps) {
    const router = useRouter();
    const [offer, setOffer] = useState<OfferData>();
    const [loading, setLoading] = useState<boolean>(true);

    const loadData = async () => {
        if (props.compact) {
            try {
                const offerResponse = await axios.get(`/api/offers/${props.id}`, { withCredentials: true, timeout: 5000 });

                const newOffer: OfferData = {
                    title: offerResponse.data.data.name,
                };

                return newOffer;
            } catch (err: any) {
                console.log(err);
                message.error(`Failed to load offers: ${err.message}`);
            }
        }
        else{
        try {
            const offerResponse = await axios.get(`/api/offers/${props.id}`, { withCredentials: true, timeout: 5000 });
            const teacherResponse = await axios.get(`/api/teacher/${offerResponse.data.data.teacherID}`, {
                withCredentials: true,
                timeout: 5000
            });

            const newOffer: OfferData = {
                title: offerResponse.data.data.name,
                description: offerResponse.data.data.description,
                teacherID: offerResponse.data.data.teacherID,
                rating: teacherResponse.data.data.rating,
                name: teacherResponse.data.data.name,
                surname: teacherResponse.data.data.surname,
                picture: teacherResponse.data.data.profilePicture
            };

            return newOffer;
        } catch (err: any) {
            console.log(err);
            message.error(`Failed to load offers: ${err.message}`);
        }
    }};

    useEffect(() => {
        if (!offer && loading) {
            setLoading(false);
            loadData().then((newOffer) => {
                setOffer(newOffer);
            }).catch(
                (err) => {
                    console.log(err);
                    message.error(`Failed to load offers: ${err.message}`);
                }
            );
        }
    }, [props.id, loading]);

    if (!offer) {
        // You can render a loading state here if needed
        return <Skeleton active />;
    }

    if (props.compact) {
        return (
            <Card hoverable onClick={() => router.push(`/offers/${props.id}`)}
            style={{ width: '100%'  }}
            >
                <Row>
                            <Typography.Title level={4}>{offer.title} &nbsp;</Typography.Title>
                </Row>
            </Card>
        );
    }

    if(!props.compact) {
        return (
            <Card hoverable onClick={() => router.push(`/login`)}
                  style={{ width: '100%' }}
            >
                <Row>
                    <Col span={13}>
                        <Row>
                            <Typography.Title level={3}>{offer.title} &nbsp;</Typography.Title>
                        </Row>
                        <Row
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                height: 110
                            }}
                        >
                            <Typography.Text type="secondary">{offer.description}</Typography.Text>
                        </Row>
                        <Row></Row>
                    </Col>
                    <Col span={8}>
                        <div
                            style={{
                                textAlign: "center",
                                transform: "translate(25%, 0)"
                            }}
                        >
                            <Avatar size={64} icon={<img src={`data:image/png;base64,${offer.picture}`} alt={""} />} />
                            <Typography.Text
                                strong
                                style={{
                                    marginTop: 8,
                                    display: "block",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {offer.name}
                            </Typography.Text>
                            <Statistic
                                valueStyle={{
                                    fontSize: 20,
                                    color: "gold",
                                    whiteSpace: "nowrap"
                                }}
                                value={offer.rating}
                                prefix={<StarOutlined />}
                                suffix={<div style={{ display: "flex", alignContent: "center", fontSize: 14.6 }}></div>}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    }
}
