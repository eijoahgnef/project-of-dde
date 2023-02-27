import { post, get } from "./index"

// 添加账单
export function addBill(params: string) {
    return post('/bill/add', params).then( res => res.data)
}

// 查询消费列表
export function getBillList(account: string, date: string) {
    return get('/bill/getlist', account, date).then(res => res.data)
}

// 获取月度消费
export function getMonth(account: string, date: string) {
    return get('/bill/month', account, date).then(res => res.data)
}