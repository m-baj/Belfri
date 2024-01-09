import {
    Form,
    message,
    Flex,
    Input,
    Button,
    Typography
} from "antd";
import {
    BookOutlined,
    FolderOpenOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { blue } from "@ant-design/colors";
import style from './CreateOfferForm.module.css'


interface OfferProps {
    offer_id: number;
    teacher_id: number;
    category_id: number;
    city_id: number;
    name: string;
    description: string;
    rating: number;
}

const { TextArea } = Input;

export default function CreateOfferForm() {
    const [form] = Form.useForm();
    const router = useRouter();

    const handleForm = (values: OfferProps) => {
        console.log({
            "teacher_id": values.teacher_id,
            "category_id": values.category_id,
            "city_id": values.city_id,
            "name": values.name,
            "description": values.description,
            "rating": values.rating,
            })
        axios.post("/api/offers", {
            "teacher_id": values.teacher_id,
            "category_id": values.category_id,
            "city_id": values.city_id,
            "name": values.name,
            "description": values.description,
            "rating": values.rating,
            })
            .then((res) =>
        {
            console.log(res);
            if (res.status === 200) {
                router.push("/offers");
            } else {
                console.log(res);
            }
        })
        .catch((err) => {
            console.log(err);
            message.error(err.response.data.message).then(r=>console.log(r));

        });
    }
    return (
        <Flex vertical justify="center">
            <Typography.Title style={{ color: blue[4], textAlign: "center" }}>
                Create Offer
            </Typography.Title>
            <Form
                className={style.createOfferForm}
                form={form}
                autoCapitalize="off"
                onFinish={handleForm}
            >
                <Form.Item<OfferProps>
                    name="teacher_id"
                    rules={[
                        {
                            required: true,
                            message: "Please input your teacher ID",
                        },
                    ]}
                >
                    <Input
                        placeholder="teacher_id"
                        size="large"
                        prefix={<BookOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
                <Form.Item<OfferProps>
                    name="category_id"
                    rules={[
                        {
                            required: true,
                            message: "Please input offer category ID",
                        }
                    ]}
                >
                    <Input
                        placeholder="category_id"
                        size="large"
                        prefix={<FolderOpenOutlined style={{ color: blue[4] }} />}
                    />
                </Form.Item>
            </Form>
        </Flex>
    )
}