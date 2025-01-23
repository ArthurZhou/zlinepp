import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { logout, quickLink } from "@/lib/api"
import { LucideLogOut, LucideSearch } from "lucide-react"
import { msg } from "./message"


export function AppSidebar() {
	return (
		<Sidebar><SidebarContent><SidebarGroup>
			<SidebarHeader><h1>zline++</h1></SidebarHeader>
			<SidebarGroupContent><SidebarMenu>
				<SidebarMenuItem key={"ExamScore"}><SidebarMenuButton onPointerDown={() => { quickLink() }}>
					<LucideSearch /><span>成绩查询</span></SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem key={"Logout"}>
					<AlertDialog>
						<AlertDialogTrigger className="w-[100%]"><SidebarMenuButton>
							<LucideLogOut /><span>退出登录</span></SidebarMenuButton></AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>确定?</AlertDialogTitle>
								<AlertDialogDescription>
									该操作会退出您的账户
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>取消</AlertDialogCancel>
								<AlertDialogAction onClick={() => { msg('请稍后', '正在退出您的账户');logout().then(() => location.reload()) }}>确定</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</SidebarMenuItem>
				<SidebarFooter className="text-gray-500 text-sm text-center">
					2025<br />Jincai High School & D2Lib<br />All Right Reserved
				</SidebarFooter>
			</SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent></Sidebar>
	)
}
