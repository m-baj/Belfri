import { Button, Calendar, Flex, Input, InputNumber, message, Select, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface TeacherData {
    TeacherID: number;
    OfferID: number;
}

interface LessonTerm {
    start: Date;
    end: Date;
}

export default function LessonsCalendar({ TeacherID, OfferID }: TeacherData) {

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
    const [duration, setDuration] = useState<number>(1);
    const [hour, setHour] = useState<number>(8);

    const fetchLessons = async () => {
        console.log("fetching lessons");
        try {
            const response = await axios.get(`/api/teacher/${TeacherID}/lessons`, { withCredentials: true });
            const occupiedHours: LessonTerm[] = [];
            for (const lesson of response.data.lessons) {
                console.log(lesson);
                const date = new Date(lesson.date);
                const duration1 = lesson.duration;

                // floor the date to the nearest hour
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);

                const end = new Date(date);
                end.setHours(end.getHours() + duration1);

                occupiedHours.push({
                    start: date,
                    end: end
                });
            }
            setOccupiedHours(occupiedHours);
            console.log(occupiedHours);
        } catch (err) {
            console.log(err);
        }
    };

    const isOccupied = (hour: number) => {
        const date = new Date(selectedDate);
        date.setHours(hour);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        const end = new Date(date);
        end.setHours(end.getHours() + duration);

        for (const lesson of occupiedHours) {
            if (lesson.start <= date && lesson.end >= end) {
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

        fetchLessons();
    }, []);

    const getSelectedDate = () => {
        const date = new Date(selectedDate);
        date.setHours(hour + 1);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    };


    return (
        <Flex vertical>

            <Space direction={"vertical"}>
                <Calendar mode="month" fullscreen={false} onSelect={
                    (value) => {
                        console.log(value);
                        setDateSelected(true);
                        setSelectedDate(value.format("YYYY-MM-DD"));
                    }
                } />
                <Space style={{
                    width: "100%"

                }}>
                    <Select placeholder="Click on the date first" options={getAvailableHours()}
                            disabled={!isDateSelected} value={hour} onChange={
                        (value) => {
                            setHour(Number(value));
                        }
                    } />
                    <InputNumber onChange={(value) => setDuration(Number(value))} min={1} max={4} defaultValue={1}
                                 disabled={!isDateSelected} suffix={"h"} />


                </Space>
                <Button style={{
                    width: "100%"

                }} onClick={

                    async () => {
                        console.log(
                            getSelectedDate().toISOString()
                        );
                        try {
                            await axios.post(`/api/lesson/schedule`, {
                                offerID: OfferID,
                                date: getSelectedDate().toISOString(),
                                duration: duration
                            }, { withCredentials: true });
                            message.success("Successfully scheduled lesson. Wait for confirmaton from the tutor");
                        } catch (err) {
                            message.error("Failed to add lesson");
                            console.log(err);
                        }
                    }
                } type="primary" disabled={!isDateSelected}>Schedule</Button>

            </Space>


        </Flex>
    );
}