import express from 'express';
import {
    getBugs,getBugsById,saveBug,deleteBug
} from './bug.controller.js';

import { downloadBugsPDFr } from './bug.controller.js';

import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();
// List all bugs2
router.get('/', getBugs);

// Get one bug by setted id

router.get('/export/pdf',downloadBugsPDFr)
router.get('/:id', getBugsById);

router.put('/', saveBug);


router.post('/', requireAuth, saveBug)
router.delete('/:id',requireAuth, deleteBug)

export default router;