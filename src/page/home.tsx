import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { MenuBar } from "./menubar";
import { AppSidebar } from "./sidebar";

export function Home() {
    return (<ThemeProvider defaultTheme="system"><SidebarProvider>
        <AppSidebar />
        <main style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <MenuBar />
            <div id="children">{/* Here is the page content */}
            </div>
        </main>
        <Toaster />
    </SidebarProvider></ThemeProvider>)
}