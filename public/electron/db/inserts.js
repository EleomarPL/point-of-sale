const {getConnection, closeConnection} = require('../connection');

const insertAdmin = async({ name, lastName, motherLastName, gender, age, username, password }) => {
  if (!(name && lastName && motherLastName && gender && age && username && password)) {
    return false;
  }
  const {connection, pool} = await getConnection();

  const userInfo = await connection.query('SELECT * FROM user WHERE type=0;');
  let dataAdmin = userInfo[0] || null;

  if (dataAdmin !== null) return false;
  else {
    try {
      await connection.query(
        'INSERT INTO user VALUES(null, ?, ?, ?, ?, ?, ?, ?, 0);',
        [name, lastName, motherLastName, gender, age, username, password]
      );
      closeConnection({connection, pool});
      return true;
    } catch (err) {
      closeConnection({connection, pool});
      return false;
    }
  }
};

module.exports = {
  insertAdmin
};