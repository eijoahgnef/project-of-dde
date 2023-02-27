import { post } from "./index"

export function login(body: string) {
    return post('/user/login', body).then(
        res => res.data,
        err => {
            console.log('登录出错了', err);
        })
}

export function register(body: string) {
    return post('/user/register', body).then(
        res => res.data,
        err => {
            console.log('注册出错了', err);
            
        }
    )
}
