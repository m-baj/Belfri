import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * The `useUser` function is a custom hook that retrieves the user's token and username from session
 * storage and redirects to the login page if the token or username is not found.
 * @returns The `useUser` function returns an object with two properties: `token` and `username`.
 */
export function useUser() {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const sessionToken = sessionStorage.getItem("token");
        const sessionUsername = sessionStorage.getItem("username");

        if (sessionToken && sessionUsername) {
            setToken(sessionToken);
            setUsername(sessionUsername);
        } else {
            router.push("/login");
        }
    }, [token, username, router]);

    return { token, username };
}
