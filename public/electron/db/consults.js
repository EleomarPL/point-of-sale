const bcrypt = require('bcrypt');

const {getConnection, closeConnection} = require('../connection');

const login = async({username, password}) => {
  const {connection, pool} = await getConnection();

  const userInfo = await connection.query(
    'SELECT * FROM user WHERE username= ? ;',
    [username]
  );
  const passwordUser = userInfo[0] === undefined
    ? false
    : await bcrypt.compare(password, userInfo[0].password);
  closeConnection({connection, pool});

  if (!(passwordUser && userInfo[0])) {
    return null;
  } else {
    return userInfo[0];
  }
};
const isThereAnAdmin = async() => {
  const {connection, pool} = await getConnection();
  try {
    const adminInfo = await connection.query('SELECT * FROM user WHERE type=\'admin\' ;');
    closeConnection({connection, pool});
    return adminInfo[0] ? true : false;
  } catch (err) {
    closeConnection({connection, pool});
    return null;
  }
    
};
const getProviders = async({value = '', limit}) => {
  const {connection, pool} = await getConnection();
  const getProviders = await connection.query(
    `SELECT * FROM provider WHERE CONCAT(id, company, name, lastName) LIKE '%${value}%' ORDER BY Id 
    ${limit ? 'DESC LIMIT 0,' + limit : ''};`
  );
  closeConnection({connection, pool});

  return getProviders;
};
const getEmployees = async({value, limit}) => {
  const {connection, pool} = await getConnection();
  const getDataEmployee = await connection.query(
    `SELECT id, name, lastName, motherLastName, gender, age, username, type, 
    statusUser FROM user WHERE CONCAT(id, name, lastName) LIKE '%${value}%' 
    AND type='employee' ORDER BY Id DESC ${limit ? 'LIMIT 0,' + limit : ''};`
  );
  closeConnection({connection, pool});

  return getDataEmployee;
};
const getPurchases = async({value, limit, startDate, endDate}) => {
  const {connection, pool} = await getConnection();

  let query = '';

  if (value !== undefined)
    query = `CONCAT(article.article,provider.company) LIKE '%${value}%'`;
  else
    query = `shopping.date>='${startDate}' AND shopping.date<='${endDate}'`;
  
  const getDataPurchases = await connection.query(
    `SELECT shopping.folio,article.article,provider.company,
    shopping.amountShopping,article.purchasePrice, shopping.date,
    CAST(shopping.amountShopping*article.purchasePrice AS UNSIGNED) AS total FROM
    shopping INNER JOIN article INNER JOIN provider ON
    article.id_provider = provider.id and shopping.id_article = article.id
    WHERE ${query} ORDER BY shopping.folio DESC
    ${limit ? 'LIMIT 0,' + limit : ''};`
  );
  closeConnection({connection, pool});

  return getDataPurchases;
};
const getArticleById = async({id}) => {
  const {connection, pool} = await getConnection();

  const getArticle = await connection.query(
    'SELECT * FROM article WHERE id=? ;',
    [id]
  );
  
  closeConnection({connection, pool});

  return getArticle;
};
const getProviderIdCompany = async() => {
  const {connection, pool} = await getConnection();

  const provider = await connection.query('SELECT id, company FROM provider;');
  
  closeConnection({connection, pool});

  return provider;
};
const getArticleForAuxTable = async({value}) => {
  const {connection, pool} = await getConnection();

  const provider = await connection.query(`SELECT * FROM article WHERE article LIKE '%${value}%' LIMIT 0,3;`);
  
  closeConnection({connection, pool});

  return provider;
};
const getArticlesByIdArticle = async({value = '', limit}) => {
  const {connection, pool} = await getConnection();

  const getArticles = await connection.query(
    `SELECT * FROM article WHERE CONCAT(id,' ',article) LIKE '%${value}%' 
    ${limit ? 'LIMIT 0,' + limit : ''} ;`
  );

  closeConnection({connection, pool});

  return getArticles;
};
const getArticleByIdArticleCompany = async({value}) => {
  const {connection, pool} = await getConnection();

  const getArticles = await connection.query(
    `SELECT article.id, article.article, article.purchasePrice, article.salesPrice,
    article.amount, article.dateofExpiry, article.statusArticle, provider.company
    FROM article INNER JOIN provider ON article.id_provider = provider.id
    WHERE CONCAT(article.id, provider.company, article.article) LIKE '%${value}%' ;`
  );

  closeConnection({connection, pool});

  return getArticles;
};
const getStandardSales = async({value, startDate, endDate, limit}) => {
  const {connection, pool} = await getConnection();

  let query = '';

  if (value !== undefined)
    query = `CONCAT(ticketf.folio,ticketf.id_user,article.article) LIKE '%${value}%'`;
  else {
    if (!(startDate && endDate)) {
      return [];
    }
    query = `ticketf.date>='${startDate}' AND ticketf.date<='${endDate}'`;
  }

  const getSales = await connection.query(
    `SELECT ticketf.folio,ticketf.id_user,article.article, 
    salesrecord.amount,salesrecord.salesPrice, salesrecord.total, 
    ticketf.date FROM ticketf INNER JOIN salesrecord INNER JOIN article ON 
    ticketf.folio=salesrecord.folio AND salesrecord.id_article=article.id 
    WHERE ${query} ORDER BY ticketf.folio DESC 
    ${limit ? 'LIMIT 0,' + limit : ''};`
  );
  closeConnection({connection, pool});

  return getSales;
};
const getStockSales = async({value = '', startDate, endDate}) => {
  if (!(startDate && endDate)) {
    return [];
  }

  const {connection, pool} = await getConnection();

  const getSales = await connection.query(
    `SELECT ticketf.id_user,provider.company,article.article,article.amount,
    SUM(salesrecord.amount) as sold,SUM(salesrecord.total) as totalPurchases FROM (((article 
    RIGHT JOIN salesrecord ON salesrecord.id_article=article.id ) 
    RIGHT JOIN ticketf ON salesrecord.folio=ticketf.folio) 
    RIGHT JOIN provider ON article.id_provider=provider.id) WHERE 
    provider.id LIKE '%${value}%' AND ticketf.date>='${startDate}' 
    AND ticketf.date<='${endDate}' GROUP BY article.id 
    ORDER BY SUM(salesrecord.amount) DESC;`
  );
  closeConnection({connection, pool});

  return getSales;
};
const getDebts = async({value = '', isGroupByDebtor}) => {
  const {connection, pool} = await getConnection();
  
  const getDataDebts = await connection.query(
    `SELECT debtor.id,debtor.name,debtor.lastName,debtor.motherLastName,
    ${isGroupByDebtor ? 'SUM(debts.total) as totalDebts' : 'debts.total'} FROM debts INNER JOIN debtor ON 
    debts.id_debtor=debtor.id AND CONCAT(debtor.id,debtor.name,
    debtor.lastName) LIKE '%${value}%' ${isGroupByDebtor ? 'GROUP BY debtor.id' : ''} ;`
  );
  closeConnection({connection, pool});

  return getDataDebts;
};
const getDebtors = async({value}) => {
  const {connection, pool} = await getConnection();
  
  const getDataDebtors = await connection.query(
    `SELECT * FROM debtor WHERE CONCAT(id, name, lastName) LIKE '%${value}%';`
  );
  closeConnection({connection, pool});

  return getDataDebtors;
};
const getDebtsFromADebtor = async({idDebtor}) => {
  const {connection, pool} = await getConnection();

  const getDebts = await connection.query(
    `SELECT debts.id as debtId,article.id as articleId,article.article,debts.amount,
    debts.price,debts.total FROM debts INNER JOIN article ON 
    debts.id_article=article.id AND debts.id_debtor=${idDebtor} ORDER 
    BY debts.id DESC;`
  );
  closeConnection({connection, pool});

  return getDebts;
};

module.exports = {
  login, isThereAnAdmin, getProviders, getPurchases, getArticleById,
  getProviderIdCompany, getArticleForAuxTable, getArticlesByIdArticle,
  getStandardSales, getStockSales, getDebts, getDebtsFromADebtor,
  getEmployees, getDebtors, getArticleByIdArticleCompany
};