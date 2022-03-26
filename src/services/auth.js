import api from './api'


export function login(email, password){
    return api.post('/auth/login', {
        username: email,
        password: password
    })
}