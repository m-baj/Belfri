import {
    Form,
    message,
    Flex,
    Input,
    Typography,
    Select,
    Button
} from "antd";
import {
    FolderOpenOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { blue } from "@ant-design/colors";
import React, { useEffect, useState } from "react";


interface OfferProps {
    categoryID: number;
    cityID: number;
    name: string;
    description: string;
}

interface Categories {
    categoryID: number;
    name: string;
}

interface Cities {
    cityID: number;
    name: string;
}

const { TextArea } = Input;
const { Option } = Select;

export default function CreateOfferForm() {
    const [form] = Form.useForm();
    const router = useRouter();

    const [categories, setCategories] = useState<Categories[]>([]);
    const [cities, setCities] = useState<Cities[]>([]);

    const getCategoryID = (categoryName: string) => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === categoryName) {
                return categories[i].categoryID;
            }
        }
    }

    const getCityID = (cityName: string) => {
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name === cityName) {
                return cities[i].cityID;
            }
        }
    }

    const handleForm = (values: OfferProps) => {
        axios.post("/api/offers", {
            "categoryID": values.categoryID,
            "cityID": values.cityID,
            "name": values.name,
            "description": values.description,
        })
            .then((res) =>
            {
                console.log(res);
                if (res.status === 200) {
                    router.push("/");
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
                message.error(err.response.data.message).then(r=>console.log(r));
            });
    }

        useEffect(() => {
            const fetchCategories = async () => {
                try {
                    const response = await axios.get('/api/category/search');
                    console.log(response);
                    if (Array.isArray(response.data.categories)) {
                        setCategories(response.data.categories);
                    } else {
                        console.error('Invalid data format received:', response.data.categories);
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            fetchCategories().catch((err) => {
                console.error('Error fetching categories:', err);
            });
        }, []);

        useEffect(() => {
            const fetchCities = async () => {
                try {
                    const response = await axios.get('/api/city');
                    console.log(response);
                    if (Array.isArray(response.data.cities)) {
                        setCities(response.data.cities);
                    } else {
                        console.error('Invalid data format received:', response.data.cities);
                    }
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            };

            fetchCities().catch((err) => {
                console.error('Error fetching cities:', err);
            });
        }, []);

    return (
        <Flex vertical>
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                Create Offer
            </Typography.Title>
            <Flex justify="center">
                <Form
                    style={{ width: "40%" }}
                    form={form}
                    autoCapitalize="off"
                    onFinish={handleForm}
                >
                    <Form.Item<OfferProps>
                        name="categoryID"
                        rules={[
                            {
                                required: true,
                                message: "Please choose offer category",
                            }
                        ]}
                    >
                        <Select
                            suffixIcon={<FolderOpenOutlined style={{ color: blue[4] }} />}
                            placeholder="Select category"
                            size="large"
                            onChange={value => {
                                console.log(`Selected category: ${value}`);
                            }}
                        >
                            {categories.map(category => (
                                <Option key={category.categoryID} value={category.categoryID}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item<OfferProps>
                        name="cityID"
                        rules={[
                            {
                                required: true,
                                message: "Please choose your city name"
                            }
                        ]}
                    >
                        <Select
                            suffixIcon={<HomeOutlined style={{ color: blue[4] }} />}
                            placeholder="Select city"
                            size="large"
                            onChange={value => {
                                console.log(`Selected city: ${value}`);
                            }}
                        >
                            {cities.map(city => (
                                <Option key={city.cityID} value={city.cityID}>
                                    {city.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item<OfferProps>
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter offer name",
                            }
                        ]}
                    >
                        <Input
                            placeholder="Offer name"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item<OfferProps>
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please enter offer description",
                            }
                        ]}
                    >
                        <TextArea
                            style={{ fontSize: 16 }}
                            placeholder="Offer description"
                            autoSize={{ minRows: 5, maxRows: 8 }}
                        />
                    </Form.Item>
                    <Flex justify={"center"}>
                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit">
                                Submit
                            </Button>
                            <Button type={"link"} size="large" onClick={() => router.push("/")}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </Flex>
        </Flex>
    )
}