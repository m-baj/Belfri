import axios from "axios";
import { Flex, message, Typography } from "antd";
import { blue } from "@ant-design/colors";

interface OfferDescriptionProps {
    offerName: string;
    offerDescription: string;
}

export default function OfferDescription({ offerName, offerDescription }: OfferDescriptionProps) {

    const paragraphs = offerDescription.split("\n").map((paragraph, index) => {
        return (<Typography.Paragraph key={index} style={{ marginLeft: "10%", marginRight: "10%", marginBottom: "0" }}>
            {paragraph}
        </Typography.Paragraph>);
    });

    return (
        <Flex vertical align="flex-start" style={
            {
                justifyContent: "center"
            }}>

            <Typography.Title level={1} style={{
                color: blue[4],
                width: "100%",
                marginLeft: "10%"
            }}>{offerName}</Typography.Title>
            <div style={{
                borderLeft: "1px solid",
                borderRight: "1px solid",
                borderLeftStyle: "groove",
                borderRightStyle: "groove",
                height: "80vh"
            }}>
                {paragraphs}
            </div>
        </Flex>
    );
}