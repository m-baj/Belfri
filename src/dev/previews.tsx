import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox-next";
import { PaletteTree } from "./palette";
import LoginForm from "@/components/LoginForm/LoginForm";
import Login from "@/pages/login/Login";
import TeacherRegistrationForm from "@/components/TeacherRegistrationForm/TeacherRegistrationForm";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree />}>
            <ComponentPreview path="/LoginForm">
                <LoginForm />
            </ComponentPreview>
            <ComponentPreview path="/Login">
                <Login />
            </ComponentPreview>
            <ComponentPreview
                path="/TeacherRegistrationForm">
                <TeacherRegistrationForm />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;