
import PDFDocument from 'pdfkit';

import { Bug } from '../schemes/bugs.js';
import { User } from '../schemes/user.js';

export async function queryBugs(filter = {}) {
    return await Bug.find(filter).lean()
}

export async function getBugByIdService(id) {
    return await Bug.findById(id).lean()
}



export async function updateBugService(id,bugData) {
    return Bug.findByIdAndUpdate(id, bugData, {new: true}).lean()
}

export async function removeBugService(id) {
     await Bug.findByIdAndDelete(id)
     return id
}
export async function addBugService(bugData) {
    const bug = new Bug(bugData);
    await bug.save();
    return bug.toObject();
  }

export async function getBugs(req,res) {
    try{
        const bugs = await queryBugs(req.query)
        const users = await User.find().lean()
        const nameById  = Object.fromEntries(users.map(u => [u._id , u.fullname]))
        const enriched = bugs.map(bug => ({
            ...bug,
            ownerName: nameById[bug.ownerId]|| 'Unknown'
        }));
        res.json(enriched)
    }catch(err){
        console.error('getBugs failed', err)
        res.status(500).send({err: 'failed to get bugs'})
    }
}

export async function getBugsById(req,res) {
    try{
        const {id} = req.params;

        const visited = JSON.parse(req.cookies.visitedBugs || '[]');
        if (!visited.includes(id)) visited.push(id);
        if(visited.length > 3) return res.status(429).send('to many requests')
        res.cookie('visitedBugs', JSON.stringify(visited), {maxAge: 7000, sameSite: 'lax'})


        const bug = getBugByIdService(id);
        if(!bug) return res.status(404).send({err : 'bug not found'})
        
        const owner = await User.findById(bug.ownerId).lean();
        bug.ownerName === owner?.fullname  || 'Unknown';
        res.json(bug);
    }catch(err) {
        console.error('getbugbyid failed', err)
        res.status(500).send({err: 'failed to get byuh'})
    }
}



export async function saveBug(req,res) {
   try{
    const data = {...req.body}
    if(!data._id){
        data.ownerId = req.user._id
        const created = await  addBugService(data);
        res.status(201).json(created)
    }


    const existing = await getBugByIdService(data._id)
    if(!existing) return res.status(404).send({err: 'bug not found'});
    if(req.user.role !== 'admin' && existing.ownerId !== req.user._id){
        return res.status(403).send({err: 'you Dont have promition'})
    }  
    const updated = await updateBugService(data._id, data)
    res.json(updated)
   }catch(err){
    console.error(err, 'failed to save bug')
    res.status(500).send({err: 'failed to save bug'})
}
   
}



export async function deleteBug(req,res) {
   try{
    const {id} = req.params;
    const bug = await getBugByIdService(id);

    if(!bug) return res.status(404).send({err: 'failed to get bug'})
    if(req.user.role !== 'admin' & bug.ownerId !== req.user._id ){
       return res.status(403).send({err: "not your bug"})
    }


    await removeBugService(id)
    res.json({msg : "bug removed"})
   }catch(err){
    console.error(err, 'failed to delete bug' )
    res.status(500).send({err: 'failed to delete bug'})
  
   }
  }
export async function downloadBugsPDFr(req, res) {
  try {
    const bugs = await queryBugs();

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename="bugs-report.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('bug Report', { align: 'center' });
    doc.moveDown();

    bugs.forEach((bug, idx) => {
      doc.fontSize(12).text(`Bug #${idx + 1}`);
      doc.text(`Title: ${bug.title}`);
      doc.text(`Serverity: ${bug.severity}`);
      doc.text(`Description: ${bug.description || 'N/A'} `);
      doc.text(`Created: ${new Date(bug.createdAt).toLocaleString()}`);
      doc.moveDown();
    });
    doc.end();
  } catch (err) {
    console.log(`failed to generate PDF`, err);
    res.status(500).send({ err: 'failed to generate PDF' });
  }
}