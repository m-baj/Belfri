import React from "react";
import { Flex, Typography, Button, Select, Input, Tooltip } from "antd";
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
      value: 'gdynia',
      label: 'Gdynia',
    },
  ];


export default function PageHeader() {
    return (
        <Flex justify='space-between' align='center'
              style={{ background: blue[1], width: '100%', height: '100px' }}>
            <Typography.Title style={{ color: blue[4], textAlign: "left", padding: 16 }}>
                {config.appName}
            </Typography.Title>
            <Flex>
                <Select showSearch placeholder='Select city' options={options} />
                <Search placeholder="Enter subject" onSearch={value => console.log(value)} style={{ width: 500 }} />
            </Flex>
            <Flex gap='small' style={{padding: 16}}>
                <Tooltip title="Notifications">
                    <Button type="default" icon={<BellOutlined />} shape='circle' size='large' />
                </Tooltip>
                <Tooltip title="Settings">
                    <Button type="default" icon={<SettingOutlined />} shape='circle' size='large' />
                </Tooltip>
            </Flex>
        </Flex>
    );
}
