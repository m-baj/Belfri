import { useUser } from "@/hooks/useUser";
import Login from "./Login";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

export default function Loader() {
    const { loading } = useUser({
        loggedIn: false,
        redirectTo: "/",
    });

    if (loading) return <LoadingComponent />;
    return <Login />;
}
