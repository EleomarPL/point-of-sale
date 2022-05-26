import { notifyError, notifySuccess } from '../consts/notifications';

const useArticle = () => {
  const getArticles = async({value, limit}) => {
    const data = await window.electron.invoke('main:get-article-by-keyword', {value, limit});
    if (!data) return false;

    return data.map(article => ({
      ...article, code: article.id,
      statusArticle: article.statusArticle === 'locked' ? 'Bloqueado' : 'Activo'
    }));
  };
  const getArticlesByKeywordaAndCompany = ({value}) => {
    window.electron.send('main:get-article-by-keyword-company', {value});
  };
  const updateSalesPriceArticle = async({id, salesPrice}) => {
    const data = await window.electron.invoke('main:update-salesprice-article', {id, salesPrice});
    if (!data) return false;

    const affectedRows = data.affectedRows;

    if (affectedRows)
      notifySuccess('Articulo actualizado correctamente');
    else
      notifyError('Error, articulo no actualizado');

    return affectedRows;
  };
  const updateStatusArticle = async({id, willItLocked}) => {
    const data = await window.electron.invoke('main:update-status-article', {id, willItLocked});
    if (!data) {
      notifyError('Estado del articulo no actualizado');
      return false;
    }

    notifySuccess('Estado del articulo actualizado correctamente');
    return data;
  };
  const getArticleById = async({id}) => {
    const data = await window.electron.invoke('main:get-article-by-id', {id});
    if (!data) return false;
    
    return data[0];
  };
  const getArticleForAuxTable = async({value}) => {
    const data = await window.electron.invoke('main:get-article-for-auxtable', {value});
    if (!data) return false;

    return data.map(dataArticle => {
      return {
        ...dataArticle, code: dataArticle.id
      };
    });
  };

  return {
    getArticles, updateSalesPriceArticle, updateStatusArticle, getArticleById,
    getArticleForAuxTable, getArticlesByKeywordaAndCompany
  };
};

export default useArticle;