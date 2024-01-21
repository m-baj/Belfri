import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, message, Skeleton, Space, Typography } from "antd";

interface LessonData {
    title?: string;
    category?: string;
    student?: number;
    date?: string;
    time?: string;
    duration?: number;
}

export interface LessonDataProps {
    id: number;
}

export default function LessonList(props: LessonDataProps) {
    const [lessons, setLessons] = useState<LessonData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const loadData = async () => {
        try {
            const lessonResponse = await axios.get(`/api/teacher/${props.id}/lessons`, {
                withCredentials: true,
                timeout: 5000
            });


            console.log("API Response: ", lessonResponse);
            console.log("API Data: ", lessonResponse.data);

            if (lessonResponse.data && lessonResponse.data.lessons) {
                const newLessons = lessonResponse.data.lessons.map((lesson) => {
                    console.log("Lesson: ", lesson);
                    const datetime = new Date(lesson.date);
                    const date = datetime.toISOString().split('T')[0];
                    const time = datetime.toLocaleTimeString('pl', { hour12: false, hour: '2-digit', minute: '2-digit' });

                    return {
                        title: lesson.title,
                        category: lesson.category,
                        student: lesson.student,
                        date: date,
                        time: time,
                        duration: lesson.duration
                    }
                });

                setLessons(newLessons);
            } else {
                // Handle the case where data is missing or not in the expected format
                console.error("Invalid data format in lessonResponse:", lessonResponse);
                message.error("Failed to load lessons: Invalid data format");
            }
        } catch (err) {
            console.error(err);
            message.error(`Failed to load lessons: ${err.message}`);
        }
    };



    useEffect(() => {
        if (loading) {
            loadData().then(() => {
                setLoading(false);
            }).catch(
                (err) => {
                    console.log(err);
                    message.error(`Failed to load lessons: ${err.message}`);
                }
            );
        }
    }, [props.id]);

    if (loading) {
        return <Skeleton loading={loading} active />;
    }
    else {
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={lessons}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <Card title={item.title}>
                                <Space direction="vertical">
                                    <Typography.Text>{item.date} {item.time}</Typography.Text>
                                    <Typography.Text>Category: {item.category}</Typography.Text>
                                    <Typography.Text>Student: {item.student}</Typography.Text>
                                    <Typography.Text>Duration: {item.duration} hour(s)</Typography.Text>
                                </Space>
                            </Card>
                        ]}
                    >
                        <List.Item.Meta />
                    </List.Item>
                )}
            />
        );

    }
};