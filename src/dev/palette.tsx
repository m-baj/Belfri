import { Fragment } from "react";
import {
    Category,
    Component,
    Variant,
    Palette
} from "@react-buddy/ide-toolbox-next";
import AntdPalette from "@react-buddy/palette-antd";

export const PaletteTree = () => (
    <Palette>
        <AntdPalette />
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent />
                </Variant>
            </Component>
        </Category>
    </Palette>
);

export function ExampleLoaderComponent() {
    return (
        <Fragment>Loading...</Fragment>
    );
}