import axios from "axios";


const BASE_URL = 'http://localhost:3030/api/auth'

export async function login(credentials) {
    const res = await axios.post(`${BASE_URL}/login`, credentials)
    _storeToken(res.data.token)
    return res.data.user
}

export async function signup(credentials) {
    const res = await axios.post(`${BASE_URL}/signup`,credentials)
    _storeToken(res.data.token)
    return res.data.user

}

function _storeToken(token) {
    localStorage.setItem('accessToken',token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
}

export function logout() {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common['Authorization']
}