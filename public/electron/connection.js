const {createPool} = require('mariadb');

const getConnection = async() => {
  const pool = createPool({
    host: process.env.HOSTMARIADB,
    port: process.env.PORTMARIADB,
    user: process.env.USERMARIADB,
    password: process.env.PASSWORDMARIADB,
    database: process.env.DATABASEMARIADB
  });

  const connection = await pool.getConnection().catch(_ => null);
  
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