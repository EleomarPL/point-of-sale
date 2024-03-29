const bcrypt = require('bcrypt');

const { getConnection, closeConnection } = require('../connection');

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
const updatePasswordAdmin = async({id, oldPassword, newPassword}) => {
  if (!(oldPassword && newPassword && id)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    let resultOperation;
    const getDataAdmin = await connection.query(
      'SELECT * FROM user WHERE id=? AND type=\'admin\' ;',
      [id]
    );
    if (getDataAdmin[0]) {
      resultOperation = null;
      const passwordUser = getDataAdmin[0] === undefined
        ? false
        : await bcrypt.compare(oldPassword, getDataAdmin[0].password);

      if (passwordUser && getDataAdmin[0]) {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        resultOperation = await connection.query(
          'UPDATE user SET password=? WHERE id=? AND type=\'admin\' ;',
          [passwordHash, id]
        );
      }
    }
    closeConnection({connection, pool});

    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const updateUsernameAdmin = async({id, username, password}) => {
  if (!(username && id)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    let resultOperation;
    const getDataAdmin = await connection.query(
      'SELECT * FROM user WHERE id=? AND type=\'admin\' ;',
      [id]
    );
    if (getDataAdmin[0]) {
      resultOperation = null;
      const passwordUser = getDataAdmin[0] === undefined
        ? false
        : await bcrypt.compare(password, getDataAdmin[0].password);

      if (passwordUser && getDataAdmin[0]) {
        resultOperation = await connection.query(
          'UPDATE user SET username=? WHERE id=? AND type=\'admin\' ;',
          [username, id]
        );
      }
    }
    closeConnection({connection, pool});
    
    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const updateArticleByPurchase = async({connection, idProvider, purchasePrice, dateofExpiry, amount, id}) => {
  return await connection.query(
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
    return false;
  }
  const passwordHash = password ? await bcrypt.hash(password, 10) : '';
  const personalizedQuery = password
    ? 'UPDATE user SET username=?, password=?, age=? WHERE id=? AND type=\'employee\' ;'
    : 'UPDATE user SET username=?, age=? WHERE id=? AND type=\'employee\' ;';
  const personalizedDataQuery = password
    ? [username, passwordHash, age, id]
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
      'UPDATE user SET statusUser=? WHERE id=? AND type=\'employee\' ;',
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