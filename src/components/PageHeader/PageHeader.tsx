import React from "react";
import { Flex, Typography } from "antd";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Header() {
    return (
        <Flex justify='space-between' align='center'
              style={{ background: blue[1], width: '100%', height: '100px' }}>
                <Typography.Title style={{ color: blue[4], textAlign: "left", padding: 16 }}>
                    {config.appName}
                </Typography.Title>
        </Flex>
    );
}
