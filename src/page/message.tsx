import { toast } from "@/hooks/use-toast";

export function msg(title: string, description: string) {
    toast({
        title,
        description,
        duration: 3000
    })
}

export function errorMsg(title: string, description: string) {
    toast({
        title,
        description,
        variant: "destructive",
        duration: 2000
    })
}