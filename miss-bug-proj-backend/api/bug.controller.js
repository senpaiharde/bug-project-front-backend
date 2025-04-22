import { json } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { remove, query, getById, save } from '../services/bug.service.js';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDbPath = path.join(__dirname, '../data/user.db.json');

let _usersCache = null;
async function _loadUsers() {
  if (_usersCache) return _usersCache;
  const text = await fs.readFile(userDbPath, 'utf-8');
  const data = JSON.parse(text);

  if (!Array.isArray(data)) {
    throw new Error('user.db.json most be array of users');
  }
  _usersCache = data;
  return _usersCache;
}
export async function getBugs(req, res) {
  try {
    const [bugs, users] = await Promise.all([query(), _loadUsers()]);
    const nameById = Object.fromEntries(users.map((u) => [u._id, u.fullname]));

    const enriched = bugs.map((bug) => ({
      ...bug,
      ownerName: nameById[bug.ownerId] || 'Unknown',
    }));
    res.send(enriched);
  } catch (err) {
    console.log('failed to load bugs', err);
    res.status(500).send({ err: 'failed to get bugs' });
  }
}

export async function getBugsById(req, res) {
  try {
    const visitedBugs = JSON.parse(req.cookies.visitedBugs || '[]');
    const bugId = req.params.id;

    if (!visitedBugs.includes(bugId)) visitedBugs.push(bugId);

    if (visitedBugs.length > 3) {
      console.log('Limited Reached! wait, limit:', visitedBugs);
      return res.status(401).send('wait for a bit');
    }

    res.cookie('visitedBugs', JSON.stringify(visitedBugs), {
      maxAge: 7000,
      httpOnly: false,
      sameSite: 'lax',
    });

    const [bug, users] = await Promise.all([getById(bugId), _loadUsers()]);
    if (!bug) return res.status(404).send({ err: 'bug nott found' });

    const owner = users.find((u) => u._id === bug.ownerId);
    bug.ownerName = owner?.fullname || 'Unknown';
    res.send(bug);
  } catch (err) {
    console.log('failed to get bug by id', err);
    res.status(500).send({ err: 'faild to get bug' });
  }
}

export async function saveBug(req, res) {
  try {
    console.log(' Received bug from frontend:', req.body);

    const bugDate = { ...req.body };
    if (!bugDate._id) {
      // ─── CREATE ────────────────────────────────────────────────────
      bugDate.ownerId = req.user._id;
      const created = await save(bugDate);
      return res.status(201).json(created);
    } else {
      // ─── UPDATE ────────────────────────────────────────────────────
      const existing = await getById(bugDate._id);
      if (!existing) return res.status(404).send({ err: 'bug not found' });
      if (req.user.role !== 'admin' && existing.ownerId !== req.user._id) {
        return res.status(403).send({ err: 'not your Bug' });
      }
      bugDate.ownerId = existing.ownerId;
      const updated = await save(bugDate);
      return res.json(updated);
    }
  } catch (err) {
    console.log('failed to save bug', err);
    res.status(500).send({ err: 'failed to save bug' });
  }
}

export async function deleteBug(req, res) {
  try {
    const bug = await getById(req.params.id);
    if (!bug) return res.status(404).send({ err: 'Bug not found' });
    if (req.user.role !== 'admin' && bug.ownerId !== req.user._id) {
      return res.status(403).send({ err: 'Not your Bug' });
    }

    await remove(req.params.id);
    res.send({ msg: 'bug removed' });
  } catch (err) {
    console.log('failed to remove bug');
    res.status(500).send({ err: 'failed to remove bug' });
  }
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