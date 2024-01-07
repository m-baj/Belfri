import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import AccountActivation from "@/pages/register/activate/AccountActivation";
import { useUser } from "@/hooks/useUser";
export default function Loader() {
    const { loading } = useUser({
        loggedIn: false,
        redirectTo: "/",
    });

    if (loading) return <LoadingComponent />;
    return <AccountActivation />;
}