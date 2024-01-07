import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox-next";
import { PaletteTree } from "./palette";
import LoginForm from "@/components/LoginForm/LoginForm";
import Login from "@/pages/login/Login";
import TeacherRegistrationForm from "@/components/TeacherRegistrationForm/TeacherRegistrationForm";
import TeacherCard from "@/components/TeacherCard/TeacherCard";

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
            <ComponentPreview path="/TeacherCard">
                <TeacherCard />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;