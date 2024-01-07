import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import axios from 'axios';

interface TeacherCardProps {
    name?: string,
    surname: string,
    username: string,
    email: string,
    passHash: string,
    dateOfBirth: string,
    iban: string,
    phoneNumber: string,
    profilePictureUrl: string,
}
export default function TeacherCard(TeacherCardProps) {
    const [teacherData, setTeacherData] = useState(null);

    return (
        <Card title="Teacher Card">

        </Card>
    );
}