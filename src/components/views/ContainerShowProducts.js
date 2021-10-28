import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import SearcherPersonalized from '../common/SearcherPersonalized';
import TablePersonalized from '../common/TablePersonalized';
import useArticle from '../../hooks/useArticles';

const ContainerShowProducts = ({
  searcher, setSearcher, dataSelected, setDataSelected, classNameTable, children, isQuery = false
}) => {

  const [dataArticle, setDataArticle] = useState([]);
  const {getArticles} = useArticle();

  useEffect(() => {
    getArticles({value: searcher, limit: 15});
  }, [searcher]);
  useEffect(() => {
    window.electron.on('render:get-article-by-keyword', (err, data) => {
      if (!err) {
        console.log('error get articles');
        return null;
      }
      if (data)
        setDataArticle(data.map(article => {
          return {
            ...article, code: article.id,
            statusArticle: article.statusArticle === 'locked' ? 'Bloqueado' : 'Activo'
          };
        }));
    });

    return () => {
      window.electron.removeAllListeners('render:get-article-by-keyword');
    };
  }, []);

  let header = [
    'Codigo', 'Articulo', 'Precio',
    'Existencia', isQuery && 'Estado'
  ];
  let properties = [
    'code', 'article', 'salesPrice',
    'amount', isQuery && 'statusArticle'
  ];
  return (
    <>
      <div className="w-100 d-flex justify-content-center mt-1">
        <SearcherPersonalized
          placeholder="Buscar" title="Buscar"
          value={ searcher } setValue={ setSearcher }
        />
      </div>
      <div className="row col-md-12 mx-0 mt-1" style={ {minHeight: '64vh', maxHeight: '64vh'} }>
        <div className={ classNameTable }>
          <TablePersonalized
            header={ header } listProperties={ properties }
            listData={ dataArticle }
            dataSelected={ dataSelected } setDataSelected={ setDataSelected }
            maxHeight="64vh"
          />
        </div>
        { children }
      </div>
    </>
  );
};

ContainerShowProducts.propTypes = {
  searcher: PropTypes.string.isRequired,
  setSearcher: PropTypes.func.isRequired,
  dataSelected: PropTypes.object.isRequired,
  setDataSelected: PropTypes.func.isRequired,
  classNameTable: PropTypes.string.isRequired,
  children: PropTypes.node,
  isQuery: PropTypes.bool
};

export default ContainerShowProducts;