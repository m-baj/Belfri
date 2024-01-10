import { Flex, Image, Typography, Col, Avatar, Statistic } from "antd";
import { gold } from "@ant-design/colors";
import { StarOutlined } from "@ant-design/icons";

interface TutorInfoProps {
    pictureBase64: string;
    name: string;
    surname: string;
}

export default function TutorInfo({ pictureBase64, name, surname }: TutorInfoProps) {

    return (
        <Flex vertical align="center" style={{ justifyContent: "center" }}>
            <Avatar
                size={{ xs: 24, sm: 45, md: 60, lg: 100, xl: 200, xxl: 250 }}
                src={`data:image/png;base64,${pictureBase64}`}
                shape="square"
                style={{ marginTop: "10%", marginLeft: "20%", marginRight: "20%" }} />
            <Typography.Text
                strong
                style={{
                    marginTop: 8,
                    display: "block",
                    whiteSpace: "nowrap"
                }}
            >
                {name} {surname}
            </Typography.Text>
            <Statistic
                valueStyle={{
                    fontSize: 20,
                    color: gold[4],
                    whiteSpace: "nowrap"
                }}
                value={4.5}
                prefix={<StarOutlined />}

            />
        </Flex>
    );
}