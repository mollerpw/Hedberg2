import express from 'express';
import { getWinners } from '../controllers/winner.js';

const router = express.Router();

router.get('/', getWinners);

export default router;
