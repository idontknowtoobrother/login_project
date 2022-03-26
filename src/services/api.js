import router from '@/router'
import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    req => {
        const token = localStorage.getItem('token')
        if(token){
            req.headers.common['Authorization'] = `Bearer ${token}`
        }
        return req
    },
    err => {
        return Promise.reject(err)
    }
)

api.interceptors.response.use(
    res => {
        if(res.status === 200 || res.status === 201) {
            return Promise.resolve(res)
        }else{
            return Promise.reject(res)
        }
    },
    err => {
        if(err.response.status){
            switch (err.response.status) {
                case 400:
                    console.log('Status 400')
                    break
                case 401:
                    console.log('Session expired')
                    break
                case 403:
                    router.replace({
                        path: '/login',
                        query: { 
                            redirect: router.currentRoute.fullPath 
                        }
                    })
                    break
                case 404:
                    console.log('Status 404')
                    break
                case 502:
                    setTimeout(()=>{
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }, 1000)
                    break
            }
        }
    }
)
export default api