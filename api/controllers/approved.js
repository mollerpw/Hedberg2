import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const updateApprovedStatus = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    const values = [req.body.approved, req.body.id];
    const q = 'UPDATE posts SET `approved`= ? WHERE `id` = ?';

    db.query(q, [...values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Post has been updated.');
    });
  });
};
