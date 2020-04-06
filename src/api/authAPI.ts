import instance from './instance'

export enum ResultCode {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    Captcha = 10
}

type TResponseMe = { data: {email: string, login: string, id: number}, messages: Array<string>, resultCode: number}
const me = async ():Promise<TResponseMe> => {
    try {
        const response = await instance.get('auth/me')
        return response.data
    } catch (e) {
        throw new Error(e.message)
    }
}

type TResponseLogin = { data: {userId: number}, messages: Array<string>, resultCode: number }

const login = async (email: string, password: string, rememberMe: boolean = false, captcha: null | string = null):Promise<TResponseLogin> => {
    try {
        const response = await instance.post('auth/login', { email, password, rememberMe, captcha })
        return response.data
    } catch (e) {
        throw new Error(e.message)
    }
}

const getCaptcha = async () => await instance.get<{url: string}>('security/get-captcha-url')

export default {
    me,
    login,
    getCaptcha
}
