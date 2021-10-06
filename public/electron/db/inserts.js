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
const insertProvider = async({company, name, lastName, motherLastName}) => {
  if (!(company && name && lastName && motherLastName)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    await connection.query(
      'INSERT INTO provider VALUES(null, ?, ?, ?, ?);',
      [company, name, lastName, motherLastName]
    );
    closeConnection({connection, pool});
    return true;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
  
};

module.exports = {
  insertAdmin, insertProvider
};