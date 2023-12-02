import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * The `useUser` function is a custom hook in TypeScript that manages user authentication and redirects
 * the user to a specified page if they are not logged in.
 * @param {useUserProps.redirectTo}: The URL to redirect to if the user is (not) logged in. The default value is "/login".
 * @param {useUserProps.loggedIn}: A boolean value that determines whether the user should be logged in or not. The default value is true.
 * @returns The `useUser` function returns an object with two properties: `token` and `username`.
 */
interface useUserProps {
    redirectTo?: string;
    loggedIn?: boolean;
}

export function useUser({
    redirectTo = "/login",
    loggedIn = true,
}: useUserProps = {}) {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const sessionToken = sessionStorage.getItem("token");
        const sessionUsername = sessionStorage.getItem("username");

        if (loggedIn) {
            if (sessionToken && sessionUsername) {
                setToken(sessionToken);
                setUsername(sessionUsername);
                setLoading(false);
            } else {
                router.push(redirectTo);
            }
        } else {
            if (sessionToken && sessionUsername) {
                router.push(redirectTo);
            } else {
                setLoading(false);
            }
        }
    }, [token, username, router, redirectTo, loggedIn]);

    return { token, username, loading };
}
