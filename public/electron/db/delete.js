const { getConnection, closeConnection } = require('../connection');
const { insertSales } = require('./inserts');

const payDebt = async({idUser, total, salesRecords}) => {
  if (!(idUser, total, salesRecords)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    for (const article of salesRecords) {
      return await connection.query('DELETE FROM debts WHERE id=? ;', [article.idDebt]);
    }
    await insertSales({idUser, total, salesRecords});

    closeConnection({connection, pool});
    return true;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};

module.exports = {
  payDebt
};