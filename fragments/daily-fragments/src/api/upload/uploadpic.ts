import { post, get } from './index'

export function uploadImg(data: any) {
    return post('/upload/post', data).then(res => res.data)
}

export function homepage(account: string) {
    return get('/upload/get', account).then(res => res.data)
}