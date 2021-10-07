const {getConnection, closeConnection} = require('../connection');

const login = async({username, password}) => {
  const {connection, pool} = await getConnection();

  const userInfo = await connection.query(
    `SELECT * FROM user WHERE username='${username}' AND password='${password}';`
  );
  closeConnection({connection, pool});

  return userInfo[0] || null;
};
const isThereAnAdmin = async() => {
  const {connection, pool} = await getConnection();

  const adminInfo = await connection.query('SELECT * FROM user WHERE type=0;');
  closeConnection({connection, pool});

  return adminInfo[0] ? true : false;
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
const getPurchases = async({value, limit, startDate, endDate}) => {
  const {connection, pool} = await getConnection();

  let query = '';

  if (value !== undefined)
    query = `CONCAT(article.article,provider.company) LIKE '%${value}%'`;
  else
    query = `shopping.date>='${startDate}' AND shopping.date<='${endDate}'`;
  
  const getDataPurchases = await connection.query(
    `SELECT shopping.folio,article.article,provider.company,
    shopping.amountShopping,article.purchasePrice,
    shopping.amountShopping*article.purchasePrice FROM
    shopping INNER JOIN article INNER JOIN provider ON
    shopping.id_provider = provider.id and shopping.id_article = article.id
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

module.exports = {
  login, isThereAnAdmin, getProviders, getPurchases, getArticleById,
  getProviderIdCompany, getArticleForAuxTable, getArticlesByIdArticle
};