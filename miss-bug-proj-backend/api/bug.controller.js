
import PDFDocument from 'pdfkit';
import { Request, Response } from 'express';
import { Bug } from '../schemes/bugs.js';
import { User } from '../schemes/user.js';

export async function queryBugs(filter = {}) {
    return Bug.find(filter).lean()
}

export async function getBugByIdService(id) {
    return Bug.findById(id).lean()
}


export async function getBugByIdService(bugData) {
   const bug = new bug(bugData)
   await bug.save()
   return bug.toObject();
}
export async function updateBugService(id,bugData) {
    return Bug.findByIdAndUpdate(id, bugData, {new: true}).lean()
}

export async function updateBugService(id) {
     Bug.findByIdAndDelete(id)
     return id
}




export async function downloadBugsPDFr(req, res) {
  try {
    const bugs = await query();

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