import axios from "axios"

const BASE_URL: string = 'http://47.103.39.29:3000'
// const BASE_URL: string = 'http://localhost:3000'
axios.defaults.headers['Content-Type'] = 'application/json'

// axios.interceptors.request.use((config) => {
//     let jwtToken = window.sessionStorage.getItem('jwtToken')
//     if (jwtToken) {
//         config.headers.Authorization = jwtToken
//     }
//     return config
// })

export function post(url: string, body: any) {
    return axios.post(`${BASE_URL}${url}`, body)
}