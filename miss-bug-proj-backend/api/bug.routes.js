import express from 'express';
import {
    getBugs,getBugsById,saveBug,deleteBug
} from './bug.controller.js';

const router = express.Router();
// List all bugs2
router.get('/', getBugs);

// Get one bug by setted id
router.get('/:id', getBugs);

router.post('/', getBugsById);
router.put('/', saveBug);

router.delete('/:id',deleteBug);

export default router;