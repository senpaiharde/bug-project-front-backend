import { remove,query,getById,save } from "../services/bug.service.js";
import PDFDocument from 'pdfkit'
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

        const visitedBugs = JSON.parse(req.cookies.visitedBugs|| '[]' )
        const bugId = req.params.id
        console.log(' User requested bug ID:', req.params.id)
        console.log(' Cookie:', req.cookies.visitedBugs)
        

        if(!visitedBugs.includes(bugId)) visitedBugs.push(bugId)  // Avoid duplicates

        if(visitedBugs.length > 3) {
            console.log('Limited Reached! wait, limit:',visitedBugs)
            return res.status(401).send('wait for a bit')

        }


        res.cookie('visitedBugs', JSON.stringify(visitedBugs),
        {maxAge:7000, httpOnly:false,
            sameSite:'lax'

        })



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


export async function downloadBugsPDFr(req,res) {
    try{
        const bugs = await query()

        const doc = new PDFDocument()
        res.setHeader('Content-Disposition', 'attachment; filename="bugs-report.pdf"')
        res.setHeader('Content-Type', 'application/pdf')

        doc.pipe(res)

        doc.fontSize(20).text('bug Report', {align:'center'})
        doc.moveDown()

        bugs.forEach((bug,idx) => {
            doc.fontSize(12).text(`Bug #${idx +1}`)
            doc.text(`Title: ${bug.title}`)
            doc.text(`Serverity: ${bug.severity}`)
            doc.text(`Description: ${bug.description || 'N/A'} `)
            doc.text(`Created: ${new Date(bug.createdAt).toLocaleString()}`)
            doc.moveDown()
        });
        doc.end()
    }catch(err){
        console.log(`failed to generate PDF`,err)
        res.status(500).send({err:'failed to generate PDF'})
    }
}
