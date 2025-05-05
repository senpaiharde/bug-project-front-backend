import express from 'express';
import { requireAuth, adminOnly } from '../middlewares/requireAuth.js';
import { getMsgs, getMsgsById, saveMsg, deleteMsg } from './msg.controller.js';



const router = express.Router()

router.get('/', getMsgs)
router.get('/:id', getMsgsById)
router.post('/', requireAuth, saveMsg)
router.put('/:id',requireAuth, saveMsg)
router.delete('/:id',requireAuth, adminOnly, deleteMsg)


export default router