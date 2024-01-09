import React from 'react';
import { Card, Statistic, Typography, Row, Col, Avatar } from "antd";
import { gold } from "@ant-design/colors";
import { CarOutlined, HomeOutlined, LaptopOutlined, StarOutlined } from "@ant-design/icons";
import { router } from "next/client";
import { useRouter } from "next/router";
export interface OfferData {
    offer_id: number;
    teacher_id: number;
    category_id: number;
    city_id: number;
    name: string;
    description: string;
    rating: number;
}

export interface TeacherData {
    teacher_id: number;
    user_id: number;
    iban_number: string;
    phone_number: string;
    contract: string;
    profile_picture: Buffer;
}
export interface OfferFormProps {
    offer: OfferData;
    teacher: TeacherData;
}

export default function OfferCard(props: OfferFormProps) {
    const router = useRouter();
    return (
        <Card
            hoverable
            // style={{ marginBottom: 15, height: 194 }}
            onClick={() => router.push(`/login`)}
        >
            <Row>
                <Col span={13}>
                    <Row>
                        <Typography.Title level={3}>
                            {props.offer.name} &nbsp;
                        </Typography.Title>
                    </Row>
                    <Row
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            height: 110,
                        }}
                    >
                        <Typography.Text type="secondary">
                            {props.offer.description}
                        </Typography.Text>
                    </Row>
                    <Row></Row>
                </Col>
                <Col span={8}>
                    <div
                        style={{
                            textAlign: 'center',
                            transform: 'translate(25%, 0)',
                        }}
                    >
                        <Avatar size={64} src={`data:image/jpeg;base64,${props.teacher.profile_picture.toString('base64')}`} />                        <Typography.Text
                            strong
                            style={{
                                marginTop: 8,
                                display: 'block',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {props.teacher.user_id}
                        </Typography.Text>
                        <Statistic
                            valueStyle={{
                                fontSize: 20,
                                color: gold[4],
                                whiteSpace: 'nowrap',
                            }}
                            value={props.offer.rating}
                            prefix={<StarOutlined />}
                            suffix={
                                <div
                                    style={{
                                        display: 'flex',
                                        alignContent: 'center',
                                        fontSize: 14.6,
                                    }}
                                >
                                </div>
                            }
                        />
                    </div>
                </Col>
            </Row>
        </Card>
    );
}
