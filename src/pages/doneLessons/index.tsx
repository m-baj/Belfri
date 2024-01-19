import { useUser } from "@/hooks/useUser";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

export default function Loader() {
    const { loading } = useUser({
        loggedIn: true,
        redirectTo: "/",
    });

    if (loading) return <LoadingComponent />;
    return (
        <div>
            <h1>Done Lessons</h1>
        </div>
    )
}