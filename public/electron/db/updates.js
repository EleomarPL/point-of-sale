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
const updatePasswordAdmin = async({id, password}) => {
  if (!(password && id)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'UPDATE user SET password=? WHERE id=? ;',
      [password, id]
    );
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const updateUsernameAdmin = async({id, username}) => {
  if (!(username && id)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'UPDATE user SET username=? WHERE id=? ;',
      [username, id]
    );
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const updateArticleByPurchase = async({connection, idProvider, purchasePrice, dateofExpiry, amount, id}) => {
  await connection.query(
    'UPDATE article SET id_provider=?, purchasePrice=?, dateofExpiry=?, amount=amount+? WHERE id=? ;',
    [ idProvider, purchasePrice, dateofExpiry || null, amount, id ]
  );
};
const updateAmountArticle = async({connection, id, amountToSubtract}) => {
  return await connection.query(
    'UPDATE article SET amount=amount-? WHERE id=? AND amount-?>=0 AND statusArticle=\'unlocked\';',
    [amountToSubtract, id, amountToSubtract]
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
const updateUsernamePasswordAgeEmployee = async({id, username, password, age}) => {
  if (!(id, username, age)) {
    console.log({id, username, password, age});
    console.log('no paso 1');
    return false;
  }
  const personalizedQuery = password
    ? 'UPDATE user SET username=?, password=?, age=? WHERE id=? ;'
    : 'UPDATE user SET username=?, age=? WHERE id=? ;';
  const personalizedDataQuery = password
    ? [username, password, age, id]
    : [username, age, id];
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      personalizedQuery, personalizedDataQuery
    );
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const updateStatusEmployee = async({id, willIsLocked}) => {
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'UPDATE user SET statusUser=? WHERE id=? ;',
      [willIsLocked ? 'locked' : 'unlocked', id]
    );
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const updateDebtor = async({idDebtor, address}) => {
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'UPDATE debtor SET address=? WHERE id=? ;',
      [address, idDebtor]
    );
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};

module.exports = {
  updateProvider, updateArticleByPurchase, updateSalesPriceArticle, updateStatusArticle,
  updateUsernamePasswordAgeEmployee, updateStatusEmployee, updateUsernameAdmin, updatePasswordAdmin,
  updateAmountArticle, updateDebtor
};