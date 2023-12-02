import style from "./LoadingComponent.module.css";
import { Spin } from "antd";
interface LoadingComponentProps {
    message?: string;
}

export default function LoadingComponent(props: LoadingComponentProps) {
    return (
        <div className={style.center}>
            <Spin size="large" tip={props.message}>
                <div className={style.content} />
            </Spin>
        </div>
    );
}
