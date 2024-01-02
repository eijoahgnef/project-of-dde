import axios from 'axios'
import { BACKEND_ADDRESS } from './config'
import { notification } from 'antd'

const BASE_URL = BACKEND_ADDRESS
const WHITE_API: any[] = ['/auth/login', '/auth/register']

const _reqest = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  withCredentials: true // 设置为true后，每次请求都可以携带凭证（包含跨域）
})

_reqest.interceptors.request.use(
  (config) => {
    const { url } = config
    if (!WHITE_API.includes(url)) {
      const token = sessionStorage.getItem('auth-token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      } else {
        window.location.href = '/login'
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)


_reqest.interceptors.response.use(
  (response) => {
    const { status, data } = response
    console.log(response);
    
    // if (status === 401 || data.code === 401) {
    //   return Promise.reject(response)
    // }
    if (status === 200) {
      if (!data.code && data.message) {
        return Promise.reject(response)
      }
    }
    return response
  },
  (error) => {
    const { status, data } = error.response
    if (status === 401) {
      window.location.href = '/login'
      window.sessionStorage.removeItem('auth-token')
    } else {
      notification.error({
        message: '请求错误',
        description: data?.msg || 'Error'
      })
    }
    return Promise.reject(error)
  }
)


export const request = _reqest