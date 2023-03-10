import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = 'SELECT * FROM users WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json('Användare finns redan!');

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO users(`firstname`, `lastname`, `email`,`password`, `role`) VALUES (?)';
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hash,
      'user',
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Användare skapad.');
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q =
    'SELECT *, CONCAT_WS(" ", firstName, lastname ) AS firstname FROM users WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('Användare finns inte!');

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json('Fel användarnamn eller lösenord!');

    const token = jwt.sign({ id: data[0].id, role: data[0].role }, 'jwtkey');
    const { password, ...other } = data[0];

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};
