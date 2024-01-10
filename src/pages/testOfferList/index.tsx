import React from 'react';
import OL from '@/pages/testOfferList/OL';
import { useUser } from '@/hooks/useUser';
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TeacherRegistration from "@/pages/register/teacher/TeacherRegistration";

export default function Home() {
    const { loading } = useUser({
        loggedIn: true,
        redirectTo: "/",
    });

    if (loading) return <LoadingComponent />;
    return (
        <div>
            <OL />
        </div>
    );
}