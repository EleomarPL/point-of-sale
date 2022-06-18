const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'mariadb.db'));

const createSQLFormatSQLite = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE mariadbInfo (
        port INTEGER NOT NULL,
        host TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        database TEXT NOT NULL
      );
    `, (err) => {
      if (err) {
        console.log('error');
        return true;
      }
      console.log('table created');
    });
  });
  db.close();
};

module.exports = { createSQLFormatSQLite };