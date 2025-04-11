import { remove,query,getById,save } from "../services/bug.service.js";

export async function getBugs(req, res) {
    try {
        const bugs = await query();
        res.send(bugs);
    }catch(err){
        console.log('failed to load bugs', err);
        res.status(500).send({err:'failed to get bugs'});
    }
    
}

export async function getBugsById(req, res) {
    try {
        const bug = await getById(req.params.id);
        if(!bug) return res.status(404).send({err: 'bug nott found'});
        res.send(bug);
    }catch(err){
        console.log("failed to get bug by id",err);
        res.status(500).send({err:"faild to get bug"});
    }
}

export async function saveBug(req, res) {
    try {
        console.log(' Received bug from frontend:', req.body)
        const savebug = await save(req.body);
        res.send(savebug);
    }catch(err){
        console.log('failed to save bug', err);
        res.status(500).send({err:"failed to save bug"});
    }
}

export async function deleteBug(req, res) {
    try{
        await remove(req.params.id);
        res.send({msg:'bug removed'});

    }catch(err){
        console.log('failed to remove bug');
        res.status(500).send({err:'failed to remove bug'});
    }
}