import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { errors } from "@/lib/logger";
import { createRoot, Root } from "react-dom/client";


let logDOMContent: any[] = []
let logRoot: Root | undefined
function listLogs() {
    if (logRoot == undefined) logRoot = createRoot(document.querySelector(".logArea") as HTMLElement)
    else {
        logDOMContent = []
        logRoot.unmount()
        logRoot = createRoot(document.querySelector(".logArea") as HTMLElement)
    }
    for (let i = 0; i < errors.length; i++) {
        logDOMContent.push(<div key={i}>
            <div className="text-sm">
                {errors[i]}
            </div>
            <Separator className="my-2" />
        </div>)
    }
    logRoot.render(logDOMContent)
}

export function GetLogUI(btn: JSX.Element) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{btn}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80vw]">
                <DialogHeader>
                    <DialogTitle>错误日志</DialogTitle>
                    <DialogDescription>
                       当前会话中的所有错误 (通过logger截获)
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={listLogs}>刷新</Button>
                <ScrollArea className="h-[50vh] rounded-md border overflow-scroll break-normal text-nowrap">
                    <div className="p-4 logArea"></div>
                </ScrollArea>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}