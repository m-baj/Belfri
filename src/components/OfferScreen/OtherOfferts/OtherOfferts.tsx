import { Flex, List, Typography } from "antd";
import { blue } from "@ant-design/colors";



export default function OtherOfferts() {

    const offersData = [
            {
                title: "Matematyka",
            },
            {
                title: "Fizyka",
            },
            {
                title: "Chemia",
            },
        ];
    return (
        <Flex vertical style={{justifyContent: "center"}}>
            <Typography.Title style={{color: blue[4]}} level={4}>Other offers</Typography.Title>
                <Flex vertical style={{transform: 'translateX(2 0%)'}}>
                    <List itemLayout="horizontal" dataSource={offersData} renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.title}</a>}
                            />
                            </List.Item>
                    )} />
                </Flex>
        </Flex>
    )}