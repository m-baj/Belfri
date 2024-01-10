import React, { useState, useEffect } from "react";
import { Flex, Typography, Button, Select, Input, Tooltip, Space, message } from "antd";
import { blue } from "@ant-design/colors";
import config from "@/configs/app.config";
import { SettingOutlined, DashboardOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import CreditsCodeModal from "@/components/CreditsCodeModal/CreditsCodeModal";
import SettingsModal from "@/components/SettingsModal/SettingsModal";
import axios from "axios";

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

interface CityOption {
    value: string;
    label: string;
}

interface SubjectOption {
    value: string;
    label: string;
}

interface PageHeaderProps {
    cities: CityOption[];
    subjects: SubjectOption[];
}


export default function PageHeader(props: PageHeaderProps) {
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
    const [subjectOptions, setSubjectOptions] = useState<SubjectOption[]>([]);

    const loadData = async () => {
        try{
            const citiesResponse = await axios.get("/api/city", { withCredentials: true});
            const subjectsResponse = await axios.get("/api/category/search", { withCredentials: true});
            const load_cities = citiesResponse.data.cities;
            const load_subjects = subjectsResponse.data.categories;
            console.log(load_cities);
            console.log(load_subjects);

            const newCityOptions = load_cities.map((city) => ({
                value: city.cityID.toString(),
                label: city.name,
            }));

            const newSubjectOptions = load_subjects.map((subject) => ({
                value: subject.categoryID.toString(),
                label: subject.name,
            }));

            setCityOptions(newCityOptions);
            setSubjectOptions(newSubjectOptions);
            console.log(cityOptions);
            console.log(subjectOptions);
        } catch (err: any) {
            console.log(err);
            message.error(`Failed to load offers: ${err.message}`);
        }
    }

    useEffect(() => {
        loadData();        // loadData();
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

    const [isCreditsCodeInputVisible, setIsCreditsCodeInputVisible] = useState<boolean>(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState<boolean>(false);

    if (screenWidth >= 850) {
        return (
            <Flex justify='space-evenly' align='center' style={{ width: '100%', height: isScrolled ? '70px' : '120px' }}>
                <Typography.Title style={{ color: blue[4], paddingRight: '3%' }}>
                    {config.appName}
                </Typography.Title>
                <Flex style={{ width: '40%' }}>
                    <Space.Compact style={{ width: '100%' }}>
                        <Select showSearch placeholder='Select city' options={cityOptions} style={{ width: '35%' }} />
                        <Search placeholder='Enter subject' onSearch={value => console.log(value)} style={{ width: '65%' }} />
                    </Space.Compact>
                </Flex>
                <Flex justify='space-around' style={{ width: '15%' }}>
                    <Badge count={5}>
                        <Tooltip title="Credits remaining">
                            <Button shape="circle" size='large' icon={<DashboardOutlined/>} onClick={()=>{
                                setIsCreditsCodeInputVisible(true);
                            }}/>
                        </Tooltip>
                    </Badge>
                    <Tooltip title="Settings">
                        <Button type="default" icon={<SettingOutlined />} shape='round' size='large' onClick={() =>{
                            setIsSettingsModalVisible(true);
                        }}/>
                    </Tooltip>
                </Flex>
                <CreditsCodeModal open={isCreditsCodeInputVisible} setOpen={setIsCreditsCodeInputVisible}/>
                <SettingsModal open={isSettingsModalVisible} setOpen={setIsSettingsModalVisible}/>
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
                        <Badge count={5}>
                            <Tooltip title="hours remaining">
                                <Button shape="circle" size='large' icon={<DashboardOutlined/>} onClick={()=>{
                                    setIsCreditsCodeInputVisible(true);
                                }}/>
                            </Tooltip>
                        </Badge>
                        <Tooltip title="Settings" >
                            <Button type="default" icon={<SettingOutlined />} shape='circle' size='large' />
                        </Tooltip>
                    </Flex>
                </Flex>
                <Flex justify='center'>
                    <Space.Compact style={{ width: '85%' }}>
                        <Select showSearch placeholder='Select city' options={cityOptions} style={{ width: '30%' }} />
                        <Search placeholder='Enter subject' onSearch={value => console.log(value)} style={{ width: '70%' }} />
                    </Space.Compact>
                </Flex>
                <CreditsCodeModal open={isCreditsCodeInputVisible} setOpen={setIsCreditsCodeInputVisible}/>
            </Flex>
        );
    }
}
