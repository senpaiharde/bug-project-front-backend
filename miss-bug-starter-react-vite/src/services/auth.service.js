import axios from 'axios';

const token = localStorage.getItem('accessToken');
const BASE_URL = 'http://localhost:3030/api/auth';
axios.defaults.baseURL = 'http://localhost:3030/api';
axios.defaults.withCredentials = true;
console.log('Auth header:', axios.defaults.headers.common['Authorization']);

const initToken = localStorage.getItem('accessToken')
if (initToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${initToken}`
}

export async function login(credentials) {
    const { data } = await axios.post('/auth/login', credentials)
    _storeToken(data.token)
    _storeUser(data.user)
    return data.user
  }
  function _storeUser(user) {
    sessionStorage.setItem('accessToken', JSON.stringify(user))
  }

export async function signup(credentials) {
  const res = await axios.post(`${BASE_URL}/signup`, credentials);
  _storeToken(res.data.token);
  return res.data.user;
}

function _storeToken(token) {
  localStorage.setItem('accessToken', token);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
  axios.defaults.baseURL = 'http://localhost:3030/api';
  axios.defaults.withCredentials = true;
}

export function logout() {
  _storeToken(null);
  sessionStorage.removeItem('accessToken');
}

export function getLoggedinUser() {
  const str = sessionStorage.getItem('accessToken');
  return str ? JSON.parse(str) : null;
}
