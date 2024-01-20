import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, message, Space } from "antd";

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

export default function LessonCard(props: LessonDataProps) {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const lessonResponse = await axios.get(`/api/teacher/${props.id}/lessons`, {
                    withCredentials: true,
                    timeout: 5000
                });

                const newLessons = lessonResponse.data.data.map((lesson) => {
                    const datetime = lesson.date;
                    const date = datetime.toISOString().split('T')[0];
                    const time = datetime.toLocaleTimeString('pl', { hour12: false, hour: '2-digit', minute: '2-digit' });

                    return {
                        title: lesson.title,
                        category: lesson.category,
                        student: lesson.student,
                        date: date,
                        time: time,
                        duration: lesson.duration
                    };
                });

                setLessons(newLessons);
            } catch (err) {
                console.error(err);
                message.error(`Failed to load lessons: ${err.message}`);
            }
        };

        loadData();
    }, [props.id]);

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            {lessons.map((lesson, index) => (
                <Card key={index} title={lesson.title} extra={`${lesson.date} ${lesson.time}`}>
                    <p>Category: {lesson.category}</p>
                    <p>Student: {lesson.student}</p>
                    <p>Duration: {lesson.duration} hours</p>
                </Card>
            ))}
        </Space>
    );
};