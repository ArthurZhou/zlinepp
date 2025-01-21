import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider"
import '@/css/global.css'
import { Toaster } from "./components/ui/toaster";
import { LoginPage } from "./page/login";
import { logon } from "./lib/api";
import { Home } from "./page/home";

declare global {
    interface Window {
        __TAURI__?: any;
    }
}
export let isTauri = false

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <React.StrictMode>
            {page()}
            <Toaster />
        </React.StrictMode>
    </ThemeProvider>,
);
if (window.__TAURI__) {
    console.warn("tauri")
    isTauri = true
}

function page() {
    if (!logon) {
        return ( <LoginPage /> )
    } else {
        return ( <Home /> )
    }
}
