import { useEffect, useState, lazy, Suspense } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import {openmodalModifyProduct} from '../../components/modals/ModalModifyProduct';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';
import useArticle from '../../hooks/useArticles';
import {notifySuccess, notifyError} from '../../consts/notifications';

const ModalModifyProduct = lazy(() => import('../../components/modals/ModalModifyProduct'));

const Products = () => {
  const [searcher, setSearcher] = useState('');
  const [dataProducts, setDataProducts] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const {getArticles, updateStatusArticle} = useArticle();

  useEffect(() => {
    getArticles({value: searcher, limit: 50});
  }, [searcher]);
  useEffect(() => {
    window.electron.on('render:get-article-by-keyword', (err, data) => {
      if (!err) {
        console.log('error get articles');
        return null;
      }
      if (data)
        setDataProducts(data.map(article => {
          return {
            ...article, code: article.id,
            statusArticle: article.statusArticle === 'locked' ? 'Bloqueado' : 'Activo'
          };
        }));
    });
    window.electron.on('render:update-status-article', (err, data) => {
      if (!err) {
        console.log('error update status article');
        return null;
      }
      if (data) {
        notifySuccess('Estado del articulo actualizado correctamente');
        window.electron.send('main:get-article-by-keyword', {value: '', limit: 50});
      } else
        notifyError('Estado del articulo no actualizado');
      
      setDataSelected({});
    });

    return () => {
      window.electron.removeAllListeners('render:get-article-by-keyword');
      window.electron.removeAllListeners('render:update-status-article');
    };
  }, []);

  let header = [
    'Codigo', 'Producto', 'Precio compra',
    'Precio venta', 'Existencia', 'Estado'
  ];
  let properties = [
    'code', 'article', 'purchasePrice',
    'salesPrice', 'amount', 'statusArticle'
  ];

  let listProviders = [
    {
      classNameIcon: 'bi bi-pencil-fill',
      text: 'Modificar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        openmodalModifyProduct();
        console.log('Open modal modify');
      }
    },
    {
      classNameIcon: 'bi bi-stop-circle-fill',
      text: 'Congelar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        if (dataSelected.code)
          updateStatusArticle({id: dataSelected.code, willItLocked: true});
      }
    },
    {
      classNameIcon: 'bi bi-patch-check-fill',
      text: 'Descongelar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        if (dataSelected.code)
          updateStatusArticle({id: dataSelected.code, willItLocked: false});
      }
    }
  ];

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center mt-1">
        <SearcherPersonalized
          placeholder="Empresa"
          title="Buscar"
          value={ searcher }
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
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalModifyProduct
          dataProduct={ dataSelected }
          setDataSelected={ setDataSelected }
        />
      </Suspense>
    </div>
  );
};

export default Products;