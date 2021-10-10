const {getConnection, closeConnection} = require('../connection');
const {isThereAnAdmin} = require('./consults');
const {updateArticleByPurchase, updateAmountArticle} = require('./updates');

const insertAdmin = async({ name, lastName, motherLastName, IsAMan, age, username, password }) => {
  if (!(name && lastName && motherLastName && age && username && password)) {
    return false;
  }
  const {connection, pool} = await getConnection();

  const isThereAdmin = await isThereAnAdmin();

  if (isThereAdmin) return false;
  else {
    try {
      const resultOperation = await connection.query(
        'INSERT INTO user VALUES(null, ?, ?, ?, ?, ?, ?, ?, \'admin\', \'unlocked\');',
        [name, lastName, motherLastName, IsAMan ? 'M' : 'W', age, username, password]
      );
      closeConnection({connection, pool});
      return resultOperation;
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
    const resultOperation = await connection.query(
      'INSERT INTO provider VALUES(null, ?, ?, ?, ?);',
      [company, name, lastName, motherLastName]
    );
    closeConnection({connection, pool});
    return resultOperation;
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
          'INSERT INTO article VALUES(null, ?, ?, ?, ?, ?, ?, \'unlocked\');',
          [
            purchase.idProvider, purchase.article, purchase.purchasePrice, purchase.salesPrice,
            purchase.amount, purchase.dateofExpiry || null
          ]
        );
        idArticle = result.insertId;
      } else {
        await updateArticleByPurchase({
          connection, idProvider: purchase.idProvider, id: purchase.id, purchasePrice: purchase.purchasePrice,
          amount: purchase.amount, dateofExpiry: purchase.dateofExpiry
        });
        idArticle = purchase.id;
      }
      if (idArticle !== 0) {
        await connection.query(
          'INSERT INTO shopping VALUES(null, ?, default, ?);',
          [idArticle, purchase.amountShopping]
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
    const resultOperation = await connection.query(
      'INSERT INTO user VALUES(null, ?, ?, ?, ?, ?, ?, ?, \'employee\', \'unlocked\');',
      [name, lastName, motherLastName, IsAMan ? 'M' : 'W', age, username, password]
    );
    closeConnection({connection, pool});
    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
  
};
const insertSales = async({idUser, total, salesRecords}) => {
  if (!(idUser && total)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    const resultInsert = await connection.query(
      'INSERT INTO ticketf VALUES(null, default, ?, ?);',
      [idUser, total]
    );

    if (resultInsert.affectedRows) {
      let folioTicketf = resultInsert.insertId;
      salesRecords.forEach(async sale => {
        if (!(sale.idArticle && sale.salesPrice && sale.amount && sale.total)) {
          return false;
        }
        await connection.query(
          'INSERT INTO salesrecord VALUES(?, ?, ?, ?, ?) ;',
          [folioTicketf, sale.idArticle, sale.salesPrice, sale.amount, sale.total]
        );
        await updateAmountArticle({connection, id: sale.idArticle, amountToSubtract: sale.amount});
      });

    }

    closeConnection({connection, pool});
    return true;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const insertDebtor = async({name, lastName, motherLastName, address, IsAMan}) => {
  if (!(name, lastName, motherLastName, address)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'INSERT INTO debtor VALUES(null, ?, ?, ?, ?, ?);',
      [name, lastName, motherLastName, address, IsAMan ? 'M' : 'W']
    );
    closeConnection({connection, pool});
    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};
const insertDebt = async({idDebtor, idArticle, idUser, amount, price, total}) => {
  if (!(idDebtor, idArticle, idUser, amount, price, total)) {
    return false;
  }
  const {connection, pool} = await getConnection();
  
  try {
    const resultOperation = await connection.query(
      'INSERT INTO debts VALUES(null, ?, ?, ?, ?, ?, ?, default);',
      [idDebtor, idArticle, idUser, amount, price, total]
    );
    closeConnection({connection, pool});
    return resultOperation;
  } catch (err) {
    closeConnection({connection, pool});
    return false;
  }
};

module.exports = {
  insertAdmin, insertProvider, addPurchases, insertEmployee, insertSales,
  insertDebtor, insertDebt
};