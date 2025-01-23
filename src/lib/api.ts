import { encryptRequest } from "./crypto"
import * as log from "./logger"


const API_HOST = "https://api.zline.d2lib.com"

let cookie: string = localStorage.getItem('cookie') || 'PZLSystemLogin=';
let xToken: string
export let logon: boolean = localStorage.getItem('logon') === 'true'

async function get(url: string, params: string = "") {
    const response: any = await fetch(`${API_HOST}${url}?cookie=${encodeURIComponent(cookie)}&${params}`, {method: 'GET'})
    .then(res => res.json())
    .catch((error) => {
        log.error(error, `failed to get ${url}  reason: ${error}`)
    })

    return response
}

async function getXToken() {
    const res = await get('/security/xtoken')
    if (res.code == 200) {
        xToken = res.data.xtoken;
        log.info(`XToken retrieved: ${xToken}`);
    } else {
        log.error(Error(`Failed to retrieve XToken: ${res.code}  detail: ${res.message}`));
    }
}

export async function login(account: string, password: string) {
    if (xToken == undefined) await getXToken()

    let body: any = encryptRequest({
        XToken: xToken,
        pzlusername: account,
        pzlpassword: password
    })

    const res = await get(`/security/login`, `xtoken=${encodeURIComponent(body.XToken)}&username=${encodeURIComponent(body.pzlusername)}&password=${encodeURIComponent(body.pzlpassword)}`)
    if (res.code == 200) {
        log.info('login success')
        cookie = res.data.cookie
        localStorage.setItem('cookie', cookie)
        localStorage.setItem('logon', 'true')
        logon = true
    } else {
        log.error(Error(res.message))
        if (logon) {
            cookie = "PZLSystemLogin="
            localStorage.setItem('cookie', "PZLSystemLogin=")
            localStorage.setItem('logon', 'false')
            logon = false
        }
    }
}

export async function logout() {
    await get('/security/logout')
    cookie = "PZLSystemLogin="
    localStorage.setItem('cookie', "PZLSystemLogin=")
    localStorage.setItem('logon', 'false')
    logon = false
}

export async function loginStat() {
    const res = await get('/security/status')
    if (res.data.valid) {
        log.info("login check passed")
    } else {
        log.info("cookie expired")
        cookie = "PZLSystemLogin="
        localStorage.setItem('cookie', "PZLSystemLogin=")
        localStorage.setItem('logon', 'false')
        logon = false
        location.reload()
    }
}

export async function quickLink() {
    //const res = await get(`https://www.jincai.sh.cn/zlinesystem/hdesk/GetApplist?applbm=quicklink`)
    //console.log(res)
}