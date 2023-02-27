import axios from "axios";

// const BASE_URL: string = 'http://localhost:3000'
const BASE_URL: string = 'http://47.103.39.29:3000'

axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use((config) => {
    let jwtToken = window.sessionStorage.getItem('dailyJwt')
    if (jwtToken) {
        config.headers.Authorization = jwtToken
    }
    
    return config
})

export function post(url:string, body: any) {
    return axios.post(`${BASE_URL}${url}`, body)
}

// export function get(url:string, account: string, id: string) {
//     return axios.get(`${BASE_URL}${url}?account=${account}&insert_id=${id}`)
// }
//  写法一
export function get(url: string, data: any) {
    return axios.get(`${BASE_URL}${url}`,{
        params: {
            data
        }
    })
}

export function getContent(url: string, account: string, insert_id: string) {
    return axios.get(`${BASE_URL}${url}`, {
        params: {
            account,
            insert_id
        }
    })
}