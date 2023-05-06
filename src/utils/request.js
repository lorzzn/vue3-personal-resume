import axios from 'axios'

// 创建axios实例
const request = axios.create({
    baseURL: process.env.BASE_API, 
    timeout: 12000 // 请求超时时间
})

// request拦截器
request.interceptors.request.use(
    config => config,
    error => {
        console.error(error)  
        return Promise.reject(error)
    })

// respone拦截器
request.interceptors.response.use(
    response => response,
    error => {
        console.error(error)  
        return Promise.reject(error)
    })

export default request
