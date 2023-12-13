import React from "react";
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
    return (
        <Flex justify='space-between' align='center' style={{ width: '100%', height: '100%' }}>
            <Typography.Title style={{ color: blue[4], textAlign: "left", paddingLeft: 16 }}>
                {config.appName}
            </Typography.Title>
            <Flex>
                <Space.Compact>
                    <Select showSearch placeholder='Select city' options={options} />
                    <Search placeholder="Enter subject" onSearch={value => console.log(value)} style={{ maxWidth: 'fit-content' }} />
                </Space.Compact>
            </Flex>
            <Flex gap='small' style={{ paddingRight: 16 }}>
                <Space.Compact>
                    <Tooltip title="Notifications">
                        <Button type="default" icon={<BellOutlined />} shape='circle' size='large' />
                    </Tooltip>
                    <Tooltip title="Settings">
                        <Button type="default" icon={<SettingOutlined />} shape='circle' size='large' />
                    </Tooltip>
                </Space.Compact>
            </Flex>
        </Flex>
    );
}
