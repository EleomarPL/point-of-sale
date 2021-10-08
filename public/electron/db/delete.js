const {getConnection, closeConnection} = require('../connection');
const {insertSales} = require('./inserts');

const payDebt = async({idDebt, idUser, total, salesRecords}) => {
  if (!(idDebt, idUser, total, salesRecords)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'DELETE FROM debts WHERE id=? ;', [idDebt]
    );
    if (resultOperation.affectedRows)
      await insertSales({idUser, total, salesRecords});

    closeConnection({connection, pool});
    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};

module.exports = {
  payDebt
};