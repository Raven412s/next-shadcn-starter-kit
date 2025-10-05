import type React from "react";
import LenisProvider from "./lenis-provider";
import { ThemeProvider } from "./theme-provider";

const Provider = ({children}:{children: React.ReactNode}) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <LenisProvider>{children}</LenisProvider>
            {/* <ReactLenis root></ReactLenis> */}
        </ThemeProvider>
    )
}

export default Provider
