import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3030/api';
axios.defaults.withCredentials = true;
console.log('Auth header:', axios.defaults.headers.common['Authorization']);

const initToken = localStorage.getItem('accessToken')
if (initToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${initToken}`
}

export async function login({ email, password }) {
    const resp = await axios.post('/auth/login', { email, password });
    console.log(' [auth.service] login raw response:', resp);
    const { data } = resp;
    console.log(' [auth.service] login payload:', data);
    const { token, user } = data;
    if (!token || !user) {
      throw new Error(`Bad login response: ${JSON.stringify(data)}`);
    }
    _storeToken(token);
    _storeUser(user);
    return { token, user };
  }
  function _storeUser(user) {
    localStorage.setItem('loggedinUser', JSON.stringify(user));
  }

export async function signup({email,password,fullname}) {
  const data = await axios.post(`/auth/signup`, {email,password,fullname});
  const { token, user } = data;   
  if (!token || !user) throw new Error('Bad signup response');
  _storeToken(token);
  _storeUser(user);
  return { token, user };
}

function _storeToken(token) {
  
   localStorage.setItem('accessToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
}

export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedinUser');
    _storeToken(null)
    delete axios.defaults.headers.common['Authorization'];
}

export function getLoggedinUser() {
  const str = sessionStorage.getItem('loggedinUser');
  if (!str) return null;              
  try {
    return JSON.parse(str);
  } catch {
    console.warn('Could not parse stored user:', str);
    return null;
  }
  
}
