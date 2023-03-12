import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getGrades = (req, res) => {
  const q = 'SELECT * FROM grades WHERE userid = ?';
  db.query(q, [req.query.userid], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getGrade = (req, res) => {
  const q = 'SELECT * FROM grades WHERE applicationid = ? && userid = ?';
  db.query(q, [req.params.applicationid, req.params.userid], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const addGrade = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q =
      'INSERT INTO grades(`grade`, `userid`, `applicationid`) VALUES (?)';

    const values = [req.body.grade, req.body.userid, req.body.applicationid];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Grade has been created.');
    });
  });
};

export const updateGrade = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const gradeid = req.params.gradeid;
    const q =
      'UPDATE grades SET `grade`=? WHERE `gradeid` = ? AND `userid` = ?';

    const values = [req.body.grade, req.body.gradeid];

    db.query(q, [...values, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Grade has been updated.');
    });
  });
};
