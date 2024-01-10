import { Calendar, Flex, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface TeacherData {
    TeacherID: number;
}

interface LessonTerm {
    start: Date;
    end: Date;
}

export default function LessonsCalendar({ TeacherID }: TeacherData) {

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
    ];

    const [isDateSelected, setDateSelected] = useState<boolean>(false);
    const [occupiedHours, setOccupiedHours] = useState<LessonTerm[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");


    const fetchLessons = async () => {
        try {
            const response = await axios.get(`/api/teacher/${TeacherID}/lessons`, { withCredentials: true });
            const occupiedHours: LessonTerm[] = [];
            for (const lesson of response.data.data.lessons) {
                const date = new Date(lesson.date);
                const duration = lesson.duration;

                // floor the date to the nearest hour
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);

                const end = new Date(date);
                end.setHours(end.getHours() + duration);

                occupiedHours.push({
                    start: date,
                    end: end
                });
            }
            setOccupiedHours(occupiedHours);
        } catch (err) {
            console.log(err);
        }
    };

    const isOccupied = (hour: number) => {
        const queryDate = new Date(selectedDate);
        queryDate.setHours(hour);
        queryDate.setMinutes(0);
        queryDate.setSeconds(0);
        queryDate.setMilliseconds(0);

        for (const occupiedHour of occupiedHours) {
            if (queryDate >= occupiedHour.start && queryDate < occupiedHour.end) {
                return true;
            }
        }

        return false;
    };

    const getAvailableHours = () => {
        const availableHoursOptions = [];
        for (const hour of availableHours) {
            if (!isOccupied(hour.value)) {
                availableHoursOptions.push(hour);
            }
        }
        return availableHoursOptions;
    };

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
            } />
            <Select placeholder="Click on the date first" options={getAvailableHours()} disabled={!isDateSelected} />
        </Flex>
    );
}