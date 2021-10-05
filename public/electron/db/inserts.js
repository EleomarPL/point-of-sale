const {getConnection, closeConnection} = require('../connection');
const {isThereAnAdmin} = require('./consults');

const insertAdmin = async({ name, lastName, motherLastName, gender, age, username, password }) => {
  if (!(name && lastName && motherLastName && gender && age && username && password)) {
    return false;
  }
  const {connection, pool} = await getConnection();

  const isThereAdmin = await isThereAnAdmin();

  if (isThereAdmin) return false;
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