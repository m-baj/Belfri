import React, { useState, useEffect } from "react";
import { Flex, Typography, Button, Select, Input, Tooltip, Space } from "antd";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import { BellOutlined, SettingOutlined } from "@ant-design/icons";

const { Search } = Input;

const options = [
    {
      value: 'warszawa',
      label: 'Warszawa',
    },
    {
      value: 'grodzisk mazowiecki',
      label: 'Grodzisk Mazowiecki',
    },
  ];


export default function PageHeader() {
    const [screenWidth, setScreenWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        if (typeof window !== 'undefined') {
            handleResize();

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    } , []);

    if (screenWidth >= 850) {
        return (
            <Flex justify='space-evenly' align='center' style={{ width: '100%', height: '100%' }}>
                <Typography.Title style={{ color: blue[4], paddingRight: '3%' }}>
                    {config.appName}
                </Typography.Title>
                <Flex style={{ width: '40%' }}>
                    <Space.Compact style={{ width: '100%' }}>
                        <Select showSearch placeholder='Select city' options={options} style={{ width: '30%' }} />
                        <Search placeholder='Enter subject' onSearch={value => console.log(value)} style={{ width: '70%' }} />
                    </Space.Compact>
                </Flex>
                <Flex style={{ paddingLeft: '3%' }}>
                    <Space.Compact>
                        <Tooltip title="Notifications">
                            <Button type="default" icon={<BellOutlined />} shape='round' size='large' />
                        </Tooltip>
                        <Tooltip title="Settings">
                            <Button type="default" icon={<SettingOutlined />} shape='round' size='large' />
                        </Tooltip>
                    </Space.Compact>
                </Flex>
            </Flex>
        );
    } else {
        return (
            <Flex vertical>
                <Flex justify='space-evenly' align='center' style={{ width: '100%', height: 70 }}>
                    <Typography.Title style={{ color: blue[4] }}>
                        {config.appName}
                    </Typography.Title>
                    <Space.Compact>
                        <Tooltip title="Notifications">
                            <Button type="default" icon={<BellOutlined />} shape='circle' />
                        </Tooltip>
                        <Tooltip title="Settings">
                            <Button type="default" icon={<SettingOutlined />} shape='circle' />
                        </Tooltip>
                    </Space.Compact>
                </Flex>
                <Flex justify='center'>
                    <Space.Compact style={{ width: '85%' }}>
                        <Select showSearch placeholder='Select city' options={options} style={{ width: '30%' }} />
                        <Search placeholder='Enter subject' onSearch={value => console.log(value)} style={{ width: '70%' }} />
                    </Space.Compact>
                </Flex>
            </Flex>
        );
    }
}
