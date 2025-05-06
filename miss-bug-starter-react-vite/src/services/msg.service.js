import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/api'; 
axios.defaults.withCredentials = true;

export async function getMsgs() {
  try {
    const {data} = await axios.get('/msg');
    console.log('Fetched msgs:', data);
    return data;
  } catch (err) {
    console.error(' Failed to fetch bugs:', err.message);
    return [];
  }
  
}

export async function getMsgsById(id) {
  const res = await axios.get(`/msg/${id}`);
  return res.data;
}

export async function saveMsg(msg) {
    try{
        if(msg._id){
            const {data} = axios.put(`/msg/${msg._id}`,msg)
            return data
        }else{
            const {data} = axios.post('/msg',msg)
            return data
        }
    }catch(err){
        alert('error on saving msg')
        throw err
    }
}

export async function deleteMsg(id) {
  try {
    await axios.delete(`msg/${id}`);
  } catch (err) {
    if (err.response?.status === 401) alert('you most log in to delete a msg.');
    throw err
  }
}
