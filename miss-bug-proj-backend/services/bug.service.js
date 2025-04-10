import fs from 'fs/promises'; //allways us to read and write in aysc
import {v4 as uuid} from 'uuid'; // generating ids
import path from 'path';
import { fileURLToPath } from 'url';
import { json } from 'stream/consumers';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bugDbPath = path.join(__dirname, '..', 'data', 'bug.db.json'); //path 

let bugs = null; //caching bugs


async function _loadBugs() {
    if(!bugs) {
        const data = await fs.readFile(bugDbPath, 'utf-8')
        bugs = JSON.parse(data);
    }
}
// get all bugs
export async function query() {          
    const bugs = await _loadBugs();
    return bugs
}
 

// get bug by id 
export async function getById(bugId) {
    const bugs = await _loadBugs();
    return bugs.find(bug => bug._id === bugId)
}




export async function remove(bugId) {
    const bugs = await _loadBugs();
    const idx = bugs.findIndex(bug => bug._id === bugId);
    if( idx === -1 ) throw new Error("Bug not found");

    bugs.splice(idx, 1);
    await _saveBugs()
    
}

export async function save(bug) {
    bugs = await _loadBugs();

    if(bug._id) {
        const idx = bugs.findIndex(b => b._id === idx._id)

        if(inx === -1) throw new Error("bug not found");
        bug(inx) = bug
        
    }else{
        bug._id = uuid();
        bug.createdAt = Date.now();
        bug.push(bug);
    }
    await _saveBugs();
    return bug;
}

async function _saveBugs() {
    await fs.writeFile(bugDbPath , JSON.stringify(bugs, null , 2))
}


