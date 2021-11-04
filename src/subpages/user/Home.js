import {useContext, useState} from 'react';

import TablePersonalized from '../../components/common/TablePersonalized';
import ButtonsMy from '../../components/views/ButtonsMy';
import LogoutBox from '../../components/views/LogoutBox';
import BoxInputsSales from '../../components/views/my/BoxInputsSales';
import BoxStatusSales from '../../components/views/my/BoxStatusSales';
import {openmodalAddArticle} from '../../components/modals/ModalAddArticle';
import { openmodalViewsArticles } from '../../components/modals/ModalViewArticles';
import SalesContext from '../../contexts/Sales';

const Home = () => {

  const [dataSelected, setDataSelected] = useState({});
  const {listSales, handleCancelSale, handleDeleteSale} = useContext(SalesContext);

  let header = [
    'Codigo', 'Articulo', 'Precio',
    'Existencia', 'Cantidad'
  ];
  let properties = [
    'idArticle', 'article', 'salesPrice',
    'stock', 'amount'
  ];

  const buttonsMy = [
    {
      text: 'Buscar Articulo',
      classNameIcon: 'bi bi-search',
      onClick: () => {
        openmodalAddArticle();
      }
    },
    {
      text: 'Verificar Precios',
      classNameIcon: 'bi bi-file-code-fill',
      onClick: () => {
        openmodalViewsArticles();
      }
    },
    {
      text: 'Eliminar Producto',
      classNameIcon: 'bi bi-trash-fill',
      disabled: dataSelected.idArticle === undefined,
      onClick: () => {
        if (dataSelected.idArticle)
          handleDeleteSale({idArticle: dataSelected.idArticle});
      }
    },
    {
      text: 'Cancelar Venta',
      classNameIcon: 'bi bi-x-circle-fill',
      onClick: () => {
        handleCancelSale();
      }
    }
  ];

  return (
    <section className="col-md-12" style={ {backgroundColor: '#BED7AA'} }>
      <div style={ {minHeight: '5vh', maxHeight: '5vh', backgroundColor: '#cbd8c4'} }
        className="d-flex align-items-center"
      >
        <i className="bi bi-person-badge-fill" style={ {fontSize: '1.8rem', marginRight: '1rem'} }></i>
        <span style={ {fontSize: '1.5rem'} } >Caja 1</span>
      </div>
      <div style={ {minHeight: '15vh', maxHeight: '15vh', backgroundColor: '#d5e1cc'} }
        className="d-flex flex-wrap align-items-center"
      >
        <ButtonsMy navigation={ buttonsMy } />
      </div>
      <div className="row col-md-12 px-0 mx-0" style={ {minHeight: '70vh', maxHeight: '70vh'} }>
        <div className="col-md-9 px-0">
          <div className="w-100 px-1"
            style={ {maxHeight: '13vh', minHeight: '13vh', overflow: 'auto'} }
          >
            <BoxInputsSales
              setDataSelected={ setDataSelected }
            />
          </div>
          <div className="w-100"
            style={ {maxHeight: '57vh', minHeight: '57vh'} }
          >
            <TablePersonalized
              maxHeight="57vh"
              header={ header }
              listProperties={ properties }
              listData={ listSales }
              dataSelected={ dataSelected }
              setDataSelected={ setDataSelected }
            />
          </div>
        </div>
        <div className="col-md-3 overflow-auto"
          style={ {backgroundColor: '#d2ecc6', minHeight: '70vh', maxHeight: '70vh'} }
        >
          <BoxStatusSales
            dataSelected={ dataSelected }
            setDataSelected={ setDataSelected }
          />
        </div>
      </div>
      <LogoutBox />
    </section>
  );
};

export default Home;