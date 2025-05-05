import express, { Router } from  'express';
import {
    getUsers,
    getUserById,
    saveUsers,
    deleteUser
  } from './user.controller.js';

  import { requireAuth,adminOnly } from '../middlewares/requireAuth.js';

  const router = express.Router();

  router.use(requireAuth);

  router.get('/',    requireAuth, adminOnly, getUsers);
  router.get('/:id', requireAuth, getUserById);
  router.post('/',   requireAuth, saveUsers);
  router.put('/:id', requireAuth, saveUsers);
  router.delete('/:id', requireAuth, adminOnly, deleteUser);
  


  export default router;