import express from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = express.Router();

router.use(contactsRouter);
router.use(authRouter);

export default router; //mainRouter

//we connect both default routers studentsRouter and
//authRouter into one main router, then we pass it to server.js
