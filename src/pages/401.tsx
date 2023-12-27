import React from "react";
import { Result, Button } from "antd";
import { useRouter } from "next/router";


const UnauthorizedPage = () => {
    const router = useRouter();

    const handleBackHome = () => {
        router.push("/");
    };


    return (
        <Result
            title="401"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
                <Button type="primary" onClick={handleBackHome}>Back Home</Button>}
        />
    );
};

export default UnauthorizedPage;