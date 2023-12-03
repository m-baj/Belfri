import { useUser } from "@/hooks/useUser";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import {message} from "antd";

export default function Loader() {
    const { loading } = useUser();
    const [secret, setSecret] = useState(null);

    useEffect(() => {
        axios.get("/api/secret/", {withCredentials: true}).then((res) => {
            setSecret(res.data.secret);
        }).catch((err) => {
            if (err.response.status == 401) {
                message.error("You are not authorized to view this page");
            }
        }
        );
    },[]
    );

    if (loading && !secret) return <LoadingComponent />;

    return <>{secret}</>;
}
