// creating the connection to the database

const { createPool } = require('mariadb');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'sqlite', 'mariadb.db'));

const getConnection = async() => {
  const {result, data} = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM mariadbInfo', (err, row) => {
      if (err) {
        console.log('error select');
        reject({result: false, data: null});
      }
      console.log({columnas: row});
      if (row !== undefined)
        resolve({result: true, data: row});

      reject({result: false, data: null});
    });
  });

  if (!result) return {connection: null, pool: null};

  const pool = createPool({
    host: data.host || '',
    port: data.port || '',
    user: data.username || '',
    password: data.password || '',
    database: data.database || ''
  });

  const connection = await pool.getConnection().catch(() => null);
  
  return { pool, connection };
};

const closeConnection = async({connection = null, pool = null}) => {
  if (connection !== null)
    try {
      await connection.end(err => {
        if (err) console.log('err');
      });
      console.log('disconnect connection');
    } catch (_) {
      console.log('err');
    }
  
  if (pool !== null)
    try {
      await pool.end(err => {
        if (err) console.log(err);
      });
      console.log('end pool');
    } catch (_) {
      console.log('error end pool');
    }
};

module.exports = {
  getConnection, closeConnection
};