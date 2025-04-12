import axios from "axios";

const token = localStorage.getItem('accessToken')
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api/bug',
    withCredentials: true,
    headers:{
         Authorization: token ? `Bearer ${token}` : ''
    }
})


export async function getBugs() {
    try {
        const res = await axios.get('http://localhost:3030/api/bug')
        console.log(' API response from /api/bug:', res.data)
        return res.data
    } catch (err) {
        console.error(' Failed to fetch bugs:', err)
        return []
    }
}



export async function getBugsById(id) {
    const res = await axiosInstance.get(`/${id}`)
    return res.data
}

export async function saveBug(bug) {
    try {
        console.log(' Sending bug to backend:', bug) 
        let res
        if (bug._id) {
            res = await axiosInstance.put('/', bug)
        } else {
            res = await axiosInstance.post('/', bug)
        }
        return res.data
    } catch (err) {
        console.error(' Error saving bug:', err)
        throw err
    }
}


export async function deleteBug(id) {
    await axiosInstance.delete(`/${id}`)
}