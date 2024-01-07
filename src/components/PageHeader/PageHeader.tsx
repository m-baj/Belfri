import React, { useState, useEffect } from "react";
import { Flex, Typography, Button, Select, Input, Tooltip, Space } from "antd";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import { BellOutlined, SettingOutlined, DashboardOutlined } from "@ant-design/icons";
import { Badge } from "antd";

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

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > 0) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }
        };
        if (typeof window !== 'undefined') {
            handleScroll();

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    if (screenWidth >= 850) {
        return (
            <Flex justify='space-evenly' align='center' style={{ width: '100%', height: isScrolled ? '70px' : '120px' }}>
                <Typography.Title style={{ color: blue[4], paddingRight: '3%' }}>
                    {config.appName}
                </Typography.Title>
                <Flex style={{ width: '40%' }}>
                    <Space.Compact style={{ width: '100%' }}>
                        <Select showSearch placeholder='Select city' options={options} style={{ width: '35%' }} />
                        <Search placeholder='Enter subject' onSearch={value => console.log(value)} style={{ width: '65%' }} />
                    </Space.Compact>
                </Flex>
                <Flex justify='space-around' style={{ width: '15%' }}>
                    {/*It's possible to add a link user will be redirected after clicking on the badge with <a href='#'> */}
                    <Badge count={5}>
                        <Tooltip title="hours remaining">
                            <Button shape="circle" size='large' icon={<DashboardOutlined/>} />
                        </Tooltip>
                    </Badge>
                    <Tooltip title="Settings">
                        <Button type="default" icon={<SettingOutlined />} shape='round' size='large' />
                    </Tooltip>
                </Flex>
            </Flex>
        );
    } else {
        return (
            <Flex vertical style={{ marginBottom: '25px' }}>
                <Flex justify='space-evenly' align='center' style={{ width: '100%', height: '70px' }}>
                    <Typography.Title style={{ color: blue[4] }}>
                        {config.appName}
                    </Typography.Title>
                    <Flex justify='space-between' style={{ width: '25%' }}>
                        {/*It's possible to add a link user will be redirected after clicking on the badge with <a href='#'> */}
                        <Badge count={5}>
                            <Tooltip title="hours remaining">
                                <Button shape="circle" size='large' icon={<DashboardOutlined/>} />
                            </Tooltip>
                        </Badge>
                        <Tooltip title="Settings" >
                            <Button type="default" icon={<SettingOutlined />} shape='circle' size='large' />
                        </Tooltip>
                    </Flex>
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
