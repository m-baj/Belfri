import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useUser } from "@/hooks/useUser";
import StudenRegistration from "./StudentRegistration";

export default function Loader() {
    const { loading } = useUser({
        loggedIn: false,
        redirectTo: "/",
    });

    if (loading) return <LoadingComponent />;
    return <StudenRegistration />;
}
