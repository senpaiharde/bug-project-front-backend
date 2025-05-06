import express, { Router } from  'express';
import {
    getUsers,
    getUserById,
    saveUser,
    deleteUser
  } from './user.controller.js';

  import { requireAuth,adminOnly } from '../middlewares/requireAuth.js';

  const router = express.Router();

  router.use(requireAuth);

  router.get('/',    requireAuth, adminOnly, getUsers);
  router.get('/:id', requireAuth, getUserById);
  router.post('/',   requireAuth, saveUser);
  router.put('/:id', requireAuth, saveUser);
  router.delete('/:id', requireAuth, adminOnly, deleteUser);
  


  export default router;