import { Menubar, MenubarMenu } from "@/components/ui/menubar"
import { SidebarTrigger } from "@/components/ui/sidebar"


export function MenuBar() {
	return (
		<Menubar className="p-5">
			<MenubarMenu><SidebarTrigger /></MenubarMenu>
		</Menubar>
	)
}
