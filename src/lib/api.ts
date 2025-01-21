import { isTauri } from "@/main";
import { encryptRequest } from "./crypto"
import * as log from "./logger"


//let cookie: string = "";
let xToken: string
export let logon: boolean = localStorage.getItem('logon') === 'true'

async function getXToken() {
    const page: any = await fetch(`https://www.jincai.sh.cn/zlineauthrize/xlogin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Referer": "https://www.jincai.sh.cn/",
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
    },).then(res => res.text())
        .catch((error) => {
            log.error(error, `failed to fetch xtoken  reason: ${error}`)
        })

    const regex = /<input[^>]*id="XToken"[^>]*>/;
    const match: any = regex.exec(page);
    if (match && match[0]) {
        xToken = match[0].split("value=\"")[1].split("\" ")[0];
        log.info(`XToken retrieved: ${xToken}`);
    } else {
        log.error(Error('Failed to retrieve XToken'));
    }
}

export async function login(account: string, password: string) {
    if (xToken == undefined) await getXToken()

    let body: any = encryptRequest({
        XToken: xToken,
        pzlusername: account,
        pzlpassword: password
    })

    let bodyForm = new URLSearchParams();
    bodyForm.append('XToken', body.XToken)
    bodyForm.append('pzlusername', body.pzlusername)
    bodyForm.append('pzlpassword', body.pzlpassword)

    const response: any = await fetch(`https://www.jincai.sh.cn/zlineauthrize/xlogin/sysxlogin`, {
        method: 'POST',
        body: bodyForm,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Referer": "https://www.jincai.sh.cn/",
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
    },).then(function (response) {
        if (response.ok) {
            if (isTauri) {
                console.log(response.headers.getSetCookie())
            }
            return response.text();
        } else if (response.status == 500) {
            return JSON.stringify({
                succeed: 0,
                errorMsg: "Internal Server Error"
            })
        } else {
            throw new Error(`failed to login`)
        }
    })
        .catch((error) => {
            log.error(error, `failed to fetch login  reason: ${error}`)
        })
    let res = JSON.parse(response);
    if (res.succeed == 1) {
        log.info('login success')
        localStorage.setItem('logon', 'true')
        logon = true
    } else {
        log.error(Error(res.errorMsg))
        if (logon) {
            localStorage.setItem('logon', 'false')
            logon = false
        }
    }
}

export async function logout() {
    await fetch('https://www.jincai.sh.cn/zlinesystem/xlogin/loginout')
    localStorage.setItem('logon', 'false')
    logon = false
}