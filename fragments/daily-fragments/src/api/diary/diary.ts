import { post, get, getContent } from "./index";

// 写日记
export function keepDiary(data:any) {
    return post('/diary/keep' ,data).then(res => res.data)
}

// 查询日记列表
export function getDiaryList(data: any) {
    return get('/diary/list', data).then(res => res.data)
}

// 查询日记内容
export function getDiaryContent(account: string, insert_id: any) {
    return getContent('/diary/content', account, insert_id).then(res => res.data)
}