import express from 'express';
import {
    getBugs,getBugsById,saveBug,deleteBug
} from './bug.controller.js';

import { downloadBugsPDFr } from './bug.controller.js';

import { requireAuth } from '../middlewares/requireAuth.js';


// List all bugs2

const router = express.Router();
router.get('/export/pdf',downloadBugsPDFr)
// Get one bug by setted id

router.get('/', getBugs)
router.get('/:id', getBugsById)
router.post('/', requireAuth, saveBug)
router.put('/', requireAuth, saveBug)
router.delete('/:id', requireAuth, deleteBug)

export default router;