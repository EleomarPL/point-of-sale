const { getConnection, closeConnection } = require('./connection');

const validateConnectionToDB = async() => {
  let isSuccessfulConnection = true;

  const { pool, connection } = await getConnection();
  if (connection === null) isSuccessfulConnection = false;

  await closeConnection({connection, pool});

  return isSuccessfulConnection;
};

module.exports = { validateConnectionToDB };