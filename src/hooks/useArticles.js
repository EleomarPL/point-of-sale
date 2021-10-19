const useArticle = () => {
  const getArticles = ({value, limit}) => {
    window.electron.send('main:get-article-by-keyword', {value, limit});
  };

  return {
    getArticles
  };
};

export default useArticle;