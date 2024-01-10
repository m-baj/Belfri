import { Calendar, Flex, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface TeacherData {
    TeacherID: number;
}

export default function LessonsCalendar( { TeacherID }: TeacherData) {

    const availableHours = [
        {
            label: "8:00", value: 8
        },
        {
            label: "9:00", value: 9
        },
        {
            label: "10:00", value: 10
        },
        {
            label: "11:00", value: 11
        },
        {
            label: "12:00", value: 12
        },
        {
            label: "13:00", value: 13
        },
        {
            label: "14:00", value: 14
        },
        {
            label: "15:00", value: 15
        },
        {
            label: "16:00", value: 16
        },
        {
            label: "17:00", value: 17
        },
        {
            label: "18:00", value: 18
        },
        {
            label: "19:00", value: 19
        },
        {
            label: "20:00", value: 20
        },
        {
            label: "21:00", value: 21
        },
        {
            label: "22:00", value: 22
        },
        {
            label: "23:00", value: 23
        }
    ]

    const [isDateSelected, setDateSelected] = useState<boolean>(false);
    const [occupiedHours, setOccupiedHours] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");


    const fetchLessons = async () => {
        try {
            const response = await axios.get(`/api/teacher/${TeacherID}/lessons`, { withCredentials: true });
            setOccupiedHours(response.data.data.lessons);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const isOccupied = (value: any) => {

    }

    useEffect(() => {
    if (isDateSelected) {
            fetchLessons();
        }
    }, []);


    return (
        <Flex vertical>
            <Calendar mode="month" fullscreen={false} onSelect={
                (value) => {
                    console.log(value);
                    setDateSelected(true);
                    setSelectedDate(value.format("YYYY-MM-DD"));
                }
            }/>
            <Select placeholder="Click on the date first" options={availableHours} disabled={!isDateSelected}/>
        </Flex>
    )
}