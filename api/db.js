import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TN38MUFM',
  database: 'blog',
  multipleStatements: true,
});
