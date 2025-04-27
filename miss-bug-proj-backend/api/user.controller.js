import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { query as queryBugs } from '../services/bug.service';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDbPath = path.join(__dirname, '../data/user.db.json');


async function _loadUsers() {
    const text = await fs.readFile(userDbPath, 'utf-8')
    return JSON.parse()
}

async function _saveUsers(user) {
    await fs.writeFile(userDbPath, JSON.stringify(user,null,2))
}

async function getUser(req,res) {
    if(req.user.role !== 'admin')
        return res.status(403).send('Only admin can view a user')
    const users = await _loadUsers()
    const user = users.find(u => u.id === req.params.id)
    if(!user) return res.status(404).send('user not found');
    res.json({_id: user._id, email: user.email, fullname: user.fullname , role: user.role})


   
}

