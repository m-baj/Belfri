import { useUser } from "@/hooks/useUser";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import LessonsPanel from "@/components/LessonsPanel/LessonsPanel";

export default function Loader() {
    const { loading } = useUser({
        loggedIn: true,
        redirectTo: "/",
    });

    if (loading) return <LoadingComponent />;
    return <LessonsPanel />;
}