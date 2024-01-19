import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";

interface LessonData {
    title?: string;
    category?: string;
    studentID?: number;
    date?: string;
    time?: string;
    duration?: number;
}

export interface LessonDataProps {
    id: number;
}

export default function LessonCard(props: LessonDataProps) {
    const router = useRouter();
    const [lesson, setLesson] = useState<LessonData>();
    const [loading, setLoading] = useState<boolean>(true);

    const loadData = async () => {
        try {
            const lessonResponse = await axios.get(`/api/lessons/${props.id}`, {
                withCredentials: true,
                timeout: 5000
            });
            const newLesson: LessonData = {
                title: lessonResponse.data.data.name,
                category: lessonResponse.data.data.category,
                studentID: lessonResponse.data.data.studentID,
                date: lessonResponse.data.data.date,
                time: lessonResponse.data.data.time,
                duration: lessonResponse.data.data.duration
            };
            return newLesson;
        } catch (err: any) {
            console.log(err);
            message.error(`Failed to load lessons: ${err.message}`);
        }
    }
}