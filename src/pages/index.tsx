import { useUser } from "@/hooks/useUser";

export default function Home() {
    const { token, username } = useUser();
    return (
        <>
            {username} : {token}
        </>
    );
}
