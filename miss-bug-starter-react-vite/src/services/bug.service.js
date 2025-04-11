import axios from "axios";


const axoisInstance = axios.create({
    baseURL: 'http://localhost:3030/api/bug',
    withCredentials: true
})


export async function getBugs() {
    const res = await axoisInstance.get('/')
    return res.data
}

export async function getBugsById(id) {
    const res = await axoisInstance.get(`/${id}`)
    return res.data
}

export async function saveBug(bug) {
    if(bug._id){
        const res = axoisInstance.put('/',bug)
        return res.data
    }else {
        const res = axoisInstance.post('/',bug)
        return res.data
    }
}

export async function deleteBug(id) {
    await axoisInstance.delete(`/${id}`)
}