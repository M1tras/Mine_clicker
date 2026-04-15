const db = require('./db');

// run query
db.query('SELECT * FROM User', (err, results) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('User:', results);
});