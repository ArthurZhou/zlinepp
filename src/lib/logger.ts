import { errorMsg } from "@/page/message";

export let errors: string[] = []

function getTime() {
	var stamp = new Date().getTime();
	var time = new Date(stamp).toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 19)
	return time;
}

export function debug(text: string) {
	console.debug(`[UTC ${getTime()}] (DEBUG) > ${text}`)
}

export function info(text: string) {
	console.info(`[UTC ${getTime()}] (INFO ) > ${text}`)
}

export function warn(text: string) {
	console.warn(`[UTC ${getTime()}] (WARN ) > ${text}`)
}

export function error(error: any, description: string = `${error.name}: ${error.message}`) {
	console.error(`[UTC ${getTime()}] (ERROR) > ${description}`)
	errors.push(`[UTC ${getTime()}] > ${description} || GENERATED:${error.name}: ${error.message} || STACKTRACE:${error.stack}`)
	errorMsg("发生了一个错误", `${description}`)
}

export function trace(text: string) {
	console.trace(`[UTC ${getTime()}] (TRACE) > ${text}`)
}