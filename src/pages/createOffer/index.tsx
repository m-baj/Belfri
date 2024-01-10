import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useUser } from "@/hooks/useUser";
import CreateOfferForm from "@/components/CreateOfferForm/CreateOfferForm";

export default function Loader() {
    const { loading } = useUser({
        loggedIn: true,
        redirectTo: "/",
    });

    if (loading) return <LoadingComponent />;
    return <CreateOfferForm />;
}