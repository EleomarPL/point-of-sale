const {getConnection, closeConnection} = require('../connection');

const updateProvider = async({id, name, lastName, motherLastName}) => {
  if (!(name && lastName && motherLastName)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'UPDATE provider SET name=?, lastName=?, motherLastName=? WHERE id=? ;',
      [name, lastName, motherLastName, id]
    );
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};

module.exports = {updateProvider};