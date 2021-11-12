const useArticle = () => {
  const getArticles = ({value, limit}) => {
    window.electron.send('main:get-article-by-keyword', {value, limit});
  };
  const getArticlesByKeywordaAndCompany = ({value}) => {
    window.electron.send('main:get-article-by-keyword-company', {value});
  };
  const updateSalesPriceArticle = ({id, salesPrice}) => {
    window.electron.send('main:update-salesprice-article', {id, salesPrice});
  };
  const updateStatusArticle = ({id, willItLocked}) => {
    window.electron.send('main:update-status-article', {id, willItLocked});
  };
  const getArticleById = ({id}) => {
    window.electron.send('main:get-article-by-id', {id});
  };
  const getArticleForAuxTable = ({value}) => {
    window.electron.send('main:get-article-for-auxtable', {value});
  };

  return {
    getArticles, updateSalesPriceArticle, updateStatusArticle, getArticleById,
    getArticleForAuxTable, getArticlesByKeywordaAndCompany
  };
};

export default useArticle;