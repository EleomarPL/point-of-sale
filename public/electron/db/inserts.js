const {getConnection, closeConnection} = require('../connection');
const {isThereAnAdmin} = require('./consults');
const {updateArticleByPurchase} = require('./updates');

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
const addPurchases = async({listPurchases}) => {
  if (!listPurchases) {
    return false;
  }
  const {connection, pool} = await getConnection();

  let idArticle = 0;
  
  listPurchases.forEach(async(purchase) => {
    if (!(purchase.article && purchase.purchasePrice && purchase.salesPrice
      && purchase.amount && purchase.idProvider, purchase.amountShopping
    )) {
      return false;
    } else {
      if (!purchase.isAdded) {
        const result = await connection.query(
          'INSERT INTO article VALUES(null, ?, ?, ?, ?, ?, \'unlocked\');',
          [
            purchase.article, purchase.purchasePrice, purchase.salesPrice,
            purchase.amount, purchase.dateofExpiry || null
          ]
        );
        idArticle = result.insertId;
      } else {
        await updateArticleByPurchase({
          connection, id: purchase.id, purchasePrice: purchase.purchasePrice,
          amount: purchase.amount, dateofExpiry: purchase.dateofExpiry
        });
        idArticle = purchase.id;
      }
      if (idArticle !== 0) {
        await connection.query(
          'INSERT INTO shopping VALUES(null, ?, ?, default, ?);',
          [purchase.idProvider, idArticle, purchase.amountShopping]
        );
      }
    }
  });

  closeConnection({connection, pool});
};
const insertEmployee = async({name, lastName, motherLastName, IsAMan, age, username, password}) => {
  if (!(name, lastName, motherLastName, age, username, password)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    await connection.query(
      'INSERT INTO user VALUES(null, ?, ?, ?, ?, ?, ?, ?, 1);',
      [name, lastName, motherLastName, IsAMan ? 'M' : 'W', age, username, password]
    );
    closeConnection({connection, pool});
    return true;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
  
};

module.exports = {
  insertAdmin, insertProvider, addPurchases, insertEmployee
};