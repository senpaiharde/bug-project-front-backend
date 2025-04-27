import axios from "axios";

const token = localStorage.getItem('accessToken')
const BASE_URL = 'http://localhost:3030/api/auth'

export async function login(credentials) {
    const res = await axios.post(`${BASE_URL}/login`, credentials)
    

    _storeToken(res.data.token)
    console.log(' Login Response:', res.data)
    return res.data.user
}

export async function signup(credentials) {
    const res = await axios.post(`${BASE_URL}/signup`,credentials)
    _storeToken(res.data.token)
    return res.data.user

}

function _storeToken(token) {
    localStorage.setItem('accessToken',token)
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
    axios.defaults.baseURL = 'http://localhost:3030/api'
    axios.defaults.withCredentials = true
}

export function logout() {
    _storeToken(null)
    sessionStorage.removeItem('accessToken')
}

export function getLoggedinUser() {
    const str = sessionStorage.getItem('accessToken');
    return str ? JSON.parse(str)  : null
}