import PropTypes from 'prop-types';
import { useState } from 'react';

import SearcherPersonalized from '../common/SearcherPersonalized';
import TablePersonalized from '../common/TablePersonalized';

const ContainerShowProducts = ({
  searcher, setSearcher, dataSelected, setDataSelected, classNameTable, children
}) => {

  const [dataArticle, setDataArticle] = useState([]);

  let header = [
    'Codigo', 'Articulo', 'Precio',
    'Existencia'
  ];
  let properties = [
    'code', 'article', 'price',
    'stock'
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
  children: PropTypes.node
};

export default ContainerShowProducts;