import { useEffect, useState, lazy, Suspense } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import {openmodalModifyProduct} from '../../components/modals/ModalModifyProduct';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';
import useArticle from '../../hooks/useArticles';
import { updateStatusArray } from '../../utils/updateArray';

const ModalModifyProduct = lazy(() => import('../../components/modals/ModalModifyProduct'));

const Products = () => {
  const [searcher, setSearcher] = useState('');
  const [dataProducts, setDataProducts] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const {getArticles, updateStatusArticle} = useArticle();

  useEffect(() => {
    // Run article search
    getArticles({value: searcher, limit: 50}).then(response => {
      if (response) setDataProducts(response);
    });
  }, [searcher]);

  // Data lists to create the table
  let header = [
    'Codigo', 'Producto', 'Precio compra',
    'Precio venta', 'Existencia', 'Estado'
  ];
  let properties = [
    'code', 'article', 'purchasePrice',
    'salesPrice', 'amount', 'statusArticle'
  ];

  // List to create the buttons on the left
  let listProviders = [
    {
      classNameIcon: 'bi bi-pencil-fill',
      text: 'Modificar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        setSearcher('');
        openmodalModifyProduct();
      }
    },
    {
      classNameIcon: 'bi bi-stop-circle-fill',
      text: 'Congelar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        if (dataSelected.code)
          updateStatusArticle({id: dataSelected.code, willItLocked: true}).then(response => {
            if (response?.affectedRows === 1) {
              const newData = updateStatusArray({
                array: [...dataProducts],
                valueKey: dataSelected.code,
                key: 'code',
                keyStatus: 'statusArticle',
                willItLocked: true
              });
              setDataProducts(newData);
              setDataSelected({});
            }
          });
      }
    },
    {
      classNameIcon: 'bi bi-patch-check-fill',
      text: 'Descongelar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        if (dataSelected.code)
          updateStatusArticle({id: dataSelected.code, willItLocked: false}).then(response => {
            if (response?.affectedRows === 1) {
              const newData = updateStatusArray({
                array: [...dataProducts],
                valueKey: dataSelected.code,
                key: 'code',
                keyStatus: 'statusArticle',
                willItLocked: false
              });
              setDataProducts(newData);
              setDataSelected({});
            }
          });
      }
    }
  ];

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center mt-1">
        <SearcherPersonalized
          placeholder="Empresa"
          title="Buscar"
          setValue={ setSearcher }
        />
      </div>
      <GroupPagesAdmin listButtons={ listProviders } >
        <TablePersonalized
          header={ header }
          listProperties={ properties }
          dataSelected={ dataSelected }
          setDataSelected={ setDataSelected }
          listData={ dataProducts }
        />
      </GroupPagesAdmin>
      { /* Modal injections with code splitting */ }
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalModifyProduct
          dataSelected={ dataSelected }
          setDataSelected={ setDataSelected }
          dataProducts={ dataProducts }
          setDataProducts={ setDataProducts }
        />
      </Suspense>
    </div>
  );
};

export default Products;