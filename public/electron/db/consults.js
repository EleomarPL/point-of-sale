const {getConnection, closeConnection} = require('../connection');

const login = async({username, password}) => {
  const {connection, pool} = await getConnection();

  const userInfo = await connection.query(
    `SELECT * FROM user WHERE username='${username}' AND password='${password}';`
  );
  closeConnection({connection, pool});

  return userInfo[0] || null;
};
const isThereAnAdmin = async() => {
  const {connection, pool} = await getConnection();

  const adminInfo = await connection.query('SELECT * FROM user WHERE type=0;');
  closeConnection({connection, pool});

  return adminInfo[0] ? true : false;
};

module.exports = {
  login, isThereAnAdmin
};