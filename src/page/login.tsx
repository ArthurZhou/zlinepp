import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { ModeToggle } from "./mode-toggle";
import { login, logon } from "@/lib/api";
import { GetLogUI } from "./error-logs";
import { LucideBug } from "lucide-react";


let account: string = ""
let password: string = ""

export function LoginPage() {
    return (
        <div className="flex justify-center w-[100vw] h-[100vh]">
            <Card className="w-[350px] place-self-center">
                <CardHeader>
                    <CardTitle>请登录</CardTitle>
                    <CardDescription>使用您的校园网账号登录</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="account">账号</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="account" placeholder="" onChangeCapture={e => account = e.currentTarget.value} />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">密码</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="password" type="password" placeholder="" onChangeCapture={e => password = e.currentTarget.value} />
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex w-[100%]">
                    <Button className="w-[100%]" onClick={() => {
                        login(account, password).then(() => {if (logon) location.reload()})
                    }}>登录</Button>
                </CardFooter>
            </Card>
            <div className="absolute bottom-[17px] text-gray-500 text-sm text-center">
					2025  Jincai High School & D2Lib  All Right Reserved
				</div>
            <div className="absolute bottom-[5px] right-[5px] space-x-2"><ModeToggle />{GetLogUI(<LucideBug className="h-[1.2rem] w-[1.2rem]" />)}</div>
        </div>
    )
}