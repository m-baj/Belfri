import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jscookie from "js-cookie";
import { AuthLevel } from "@/utils/etc/AuthLevel";

/**
 * The `useUser` function is a custom hook in TypeScript that manages user authentication and redirects
 * the user to a specified page if they are not logged in.
 * @param {useUserProps.redirectTo}: The URL to redirect to if the user is (not) logged in. The default value is "/login".
 * @param {useUserProps.loggedIn}: A boolean value that determines whether the user should be logged in or not. The default value is true.
 * @returns {token}: The token of the user.
 * @returns {username}: The username of the user.
 * @returns {loading}: A boolean value that determines whether the user is loading or not.
 */
interface useUserProps {
    redirectTo?: string;
    loggedIn?: boolean;
    requiredAuthLevel?: AuthLevel;
}

interface useUserReturn {
    token: string | null;
    username: string | null;
    loading: boolean;
}

export function useUser({
                            redirectTo = "/login",
                            loggedIn = true,
                            requiredAuthLevel = AuthLevel.GUEST
                        }: useUserProps = {}): useUserReturn {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const sessionToken = jscookie.get("token");
        const sessionUsername = jscookie.get("username");
        const sessionExpiration = jscookie.get("expiration");
        const sessionAuthLevel = jscookie.get("auth_level");

        if (loggedIn) {
            // user is required to be logged in
            if (sessionToken && sessionUsername && sessionExpiration && sessionAuthLevel) {
                if (new Date(sessionExpiration) < new Date()) {
                    jscookie.remove("token");
                    jscookie.remove("username");
                    jscookie.remove("expiration");
                    jscookie.remove("auth_level");
                    router.push(redirectTo);
                }
                if (requiredAuthLevel > parseInt(sessionAuthLevel)) {
                    router.push("/401");
                }
                setToken(sessionToken);
                setUsername(sessionUsername);
                setLoading(false);
            } else {
                if (router.pathname !== "/") {
                    if (router.asPath.includes("[id") || router.query.id) {
                        if (router.query.id !== undefined) {
                            router.push(redirectTo + "?next=" + router.asPath);
                        }
                    } else {
                        router.push(redirectTo + "?next=" + router.pathname);
                    }
                } else {
                    router.push(redirectTo);
                }
            }
        } else {
            // user is required to be logged out
            if (sessionToken && sessionUsername && sessionExpiration && sessionAuthLevel) {
                router.push(redirectTo);
            } else {
                setLoading(false);
            }
        }
    }, [token, username, router, redirectTo, loggedIn, requiredAuthLevel]);

    return { token, username, loading };
}
