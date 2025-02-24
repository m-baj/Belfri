import type { AppProps } from "next/app";
import { DevSupport } from "@react-buddy/ide-toolbox-next";
import { ComponentPreviews, useInitial } from "@/dev";

// Load environment variables
require("dotenv").config();

export default function App({ Component, pageProps }: AppProps) {
    return <DevSupport ComponentPreviews={ComponentPreviews}
                       useInitialHook={useInitial}
    >
        <Component {...pageProps} />
    </DevSupport>;
}
