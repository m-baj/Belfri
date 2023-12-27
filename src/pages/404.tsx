import React from "react";
import { Result, Button } from "antd";
import { useRouter } from "next/router";

const NotFoundPage = () => {
    const router = useRouter();

    const handleBackHome = () => {
        router.push("/");
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
        />
    );
};

export default NotFoundPage;