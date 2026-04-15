const mysql = require('mysql2');

// create connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty',
  database: 'MineClicker'
});

// connect
connection.connect((err) => {
  if (err) {
    console.error('Error connecting:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;