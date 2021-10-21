const useArticle = () => {
  const getArticles = ({value, limit}) => {
    window.electron.send('main:get-article-by-keyword', {value, limit});
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

  return {
    getArticles, updateSalesPriceArticle, updateStatusArticle, getArticleById
  };
};

export default useArticle;