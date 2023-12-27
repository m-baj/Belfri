import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import { useUser } from "@/hooks/useUser";
import { AuthLevel } from "@/utils/etc/AuthLevel";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
    ssr: false
});

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
    useUser({
        requiredAuthLevel: AuthLevel.ADMIN
    });
    return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
    const spec: Record<string, any> = createSwaggerSpec({
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Belfri API",
                version: "1.0"
            }
        },
        apiFolder: "src/pages/api"
    });

    return {
        props: {
            spec
        }
    };
};

export default ApiDoc;