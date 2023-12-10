import Link from 'next/link';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';
import TeacherRegistration from './TeacherRegistration';
import { useUser } from '@/hooks/useUser';

export default function Home() {
    const { loading } = useUser({
        loggedIn: false,
        redirectTo: "/",
    });

    if (loading) return <LoadingComponent />;
    return (
        <div>
            <TeacherRegistration />
        </div>
    );
}