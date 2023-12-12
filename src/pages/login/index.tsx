// import { useUser } from "@/hooks/useUser";
// import Login from "./Login";
// import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

// export default function Loader() {
//     const { loading } = useUser({
//         loggedIn: false,
//         redirectTo: "/",
//     });

//     if (loading) return <LoadingComponent />;
//     return <Login />;
// }

import { useUser } from "@/hooks/useUser";
import { useRouter } from 'next/router';
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

export default function Loader() {
    const { loading } = useUser({
        loggedIn: true,
        redirectTo: "/",
    });

    const router = useRouter();

    if (loading) return <LoadingComponent />;
    router.push('/');
}