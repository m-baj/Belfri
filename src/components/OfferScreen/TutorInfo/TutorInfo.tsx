import { Flex, Image, Typography, Col, Avatar, Statistic } from "antd";
import { gold } from "@ant-design/colors";
import { StarOutlined } from "@ant-design/icons";


export default function TutorInfo() {
    const pictureURL: string = "data:image/jpeg;base64,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"
    const name: string = "Tomek"
    const surname: string = "Kleks"

    return (
        <Flex vertical align="center" style={{justifyContent: "center"}}>
                <Avatar
                    size={{ xs: 24, sm: 45, md: 60, lg: 100, xl: 200, xxl: 250 }}
                    src={pictureURL}
                    shape="square"
                    style={{marginTop: "10%", marginLeft: "20%", marginRight: "20%"}} />
                <Typography.Text
                strong
                style={{
                    marginTop: 8,
                    display: 'block',
                    whiteSpace: 'nowrap',
                }}
            >
                {name} {surname}
            </Typography.Text>
                <Statistic
                    valueStyle={{
                        fontSize: 20,
                        color: gold[4],
                        whiteSpace: 'nowrap',
                    }}
                    value={4.5}
                    prefix={<StarOutlined />}

                />
        </Flex>
    )
}