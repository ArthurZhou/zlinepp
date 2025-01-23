import { encryptRequest } from "./crypto"
import * as log from "./logger"


const API_HOST = "https://api.zline.d2lib.com"

let cookie: string = "";
let xToken: string
export let logon: boolean = localStorage.getItem('logon') === 'true'

async function get(url: string, params: string = "") {
    const response: any = await fetch(`${API_HOST}${url}?${params}&cookie=${encodeURIComponent(cookie)}`, {method: 'GET'})
    .then(res => res.json())
    .catch((error) => {
        log.error(error, `failed to post ${url}  reason: ${error}`)
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
            cookie = ""
            localStorage.setItem('cookie', "")
            localStorage.setItem('logon', 'false')
            logon = false
        }
    }
}

export async function logout() {
    await get('/security/logout')
    localStorage.setItem('logon', 'false')
    logon = false
}

export async function loginStat() {
    await fetch('https://www.jincai.sh.cn/zlinesystem/hdesk', {
        method: 'GET',
        headers: {
            "Referer": "https://www.jincai.sh.cn/",
            "credential": "include",
            "Cookie": cookie,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
    }).then(async res => {
        console.log(res.url)
        if (res.url=='https://www.jincai.sh.cn/zlinesystem/xlogin') {
            log.info("cookie expired")
            await logout()
            location.reload()
        } else {
            log.info("login check passed")
        }
    }).catch(async (error) => {
        log.error(error, `failed to check login status: ${error}`)
        await logout()
        location.reload()
    })
}

export async function quickLink() {
    //const res = await get(`https://www.jincai.sh.cn/zlinesystem/hdesk/GetApplist?applbm=quicklink`)
    //console.log(res)
}