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
const updateArticleByPurchase = async({connection, purchasePrice, dateofExpiry, amount, id}) => {
  await connection.query(
    'UPDATE article SET purchasePrice=?, dateofExpiry=?, amount=amount+? WHERE id=? ;',
    [ purchasePrice, dateofExpiry || null, amount, id ]
  );
};
const updateSalesPriceArticle = async({id, salesPrice}) => {
  if (!(salesPrice && id)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'UPDATE article SET salesPrice=? WHERE id=? ;',
      [salesPrice, id]
    );
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const updateStatusArticle = async({id, willItLocked}) => {
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'UPDATE article SET statusArticle=? WHERE id=? ;',
      [willItLocked ? 'locked' : 'unlocked', id]
    );
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};

module.exports = {
  updateProvider, updateArticleByPurchase, updateSalesPriceArticle, updateStatusArticle
};