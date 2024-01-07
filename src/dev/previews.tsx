import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox-next";
import { PaletteTree } from "./palette";
import LoginForm from "@/components/LoginForm/LoginForm";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree />}>
            <ComponentPreview path="/LoginForm">
                <LoginForm />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;