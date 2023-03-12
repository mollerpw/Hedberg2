import express from 'express';
import {
  getGrades,
  getGrade,
  addGrade,
  updateGrade,
} from '../controllers/grades.js';

const router = express.Router();

router.get('/', getGrades);
router.get('/:applicationid/:userid', getGrade);
router.post('/', addGrade);
router.put('/', updateGrade);

export default router;
