import express from 'express';
import { updateApprovedStatus } from '../controllers/approved.js';

const router = express.Router();

router.put('/', updateApprovedStatus);

export default router;
