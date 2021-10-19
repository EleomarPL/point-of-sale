const useArticle = () => {
  const getArticles = ({value, limit}) => {
    window.electron.send('main:get-article-by-keyword', {value, limit});
  };
  const updateSalesPriceArticle = ({id, salesPrice}) => {
    window.electron.send('main:update-salesprice-article', {id, salesPrice});
  };

  return {
    getArticles, updateSalesPriceArticle
  };
};

export default useArticle;