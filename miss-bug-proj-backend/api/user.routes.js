import express, { Router } from  'express';
import {
    listUsers,
    getUser,
    updateUser,
    deleteUser
  } from './user.controller.js';

  import { requireAuth } from '../middlewares/requireAuth.js';

  const router = express.Router();

  router.use(requireAuth);

  router.get('/',listUsers);
  router.get('/:id',getUser);
  router.put('/:id', updateUser);
  router.delete('/:id',deleteUser);


  export default router;