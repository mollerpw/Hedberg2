import { db } from '../db.js';

export const getWinners = (req, res) => {
  const q = 'SELECT * FROM winners WHERE year = ?';
  db.query(q, [req.query.year], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
