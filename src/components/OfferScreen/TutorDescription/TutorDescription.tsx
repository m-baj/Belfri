import { Flex, Typography } from "antd";
import { blue } from "@ant-design/colors";
import align from "comment-parser/transforms/align";


export default function TutorDescribtion() {

    const education_info = "Informatyka i Polityka";
    const experience = "I have been teaching for 5 years";
    // const tableData = [


    return (
            <Flex vertical  >
                <Typography.Title level={3} style={{color: blue[4]}}>Tutor info</Typography.Title>
                <Typography.Text strong> - education: </Typography.Text>
                <Typography.Text style={{marginLeft: "20px"}}>{education_info}</Typography.Text>
                <Typography.Text strong> - experience: </Typography.Text>
                <Typography.Text style={{marginLeft: "20px"}}>{experience}</Typography.Text>
            </Flex>
    )
}