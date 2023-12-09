import React from "react";
import { Flex, Typography } from "antd";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Header() {
    return (
        <Flex>
            <Typography.Title style={{ color: blue[4], textAlign: "left" }}>
                {config.appName}
            </Typography.Title>
        </Flex>
    );
}
