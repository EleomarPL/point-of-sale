import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import ButtonPersonalized from '../../common/ButtonPersonalized';
import { openmodalDebts } from '../../modals/ModalDebts';
import SalesContext from '../../../contexts/Sales';
import { isNumberValue } from '../../../services/validations/generalValidations';

const BoxStatusSales = ({dataSelected, setDataSelected}) => {
  const [totalSales, setTotalSales] = useState(0);
  const [payment, setPayment] = useState(0);

  const {listSales, handleExecuteSales} = useContext(SalesContext);

  useEffect(() => {
    setTotalSales(listSales.reduce((acc, current) => acc + current.total, 0));
    setPayment(0);
  }, [listSales]);
  useEffect(() => {
    /*window.electron.on('render:insert-sales', (err, data) => {

      if (!err) {
        console.log('error execute sales');
        return null;
      }
      if (data) {
        setDataSelected({});
        setListSales([]);
        notifySuccess('Venta generada exitosamente');
        window.electron.send('main:get-article-by-keyword', {value: '', limit: 15});
      }
    });

    return () => {
      window.electron.removeAllListeners('render:insert-sales');
    };*/
  }, []);

  const handleValidatePayment = (evt) => {
    if (isNumberValue({name: 'Pago', value: evt.target.value}))
      setPayment(Number(evt.target.value));
    else
      setPayment(0);
  };

  return (
    <>
      <div className="d-flex flex-column" style={ {fontSize: '1.6rem'} }>
        <span>Articulo:</span>
        <span>
          { dataSelected.idArticle ? Number(dataSelected.total).toFixed(2) : '0.00' }
        </span>
        <span className="fw-bold">Total:</span>
        <span className="fw-bold">
          { listSales && totalSales.toFixed(2) }
        </span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <button
          type="button"
          className="button-personalized is-menu text-black text-decoration-none w-75"
          disabled={ totalSales ? payment < totalSales : true }
          onClick={ () => handleExecuteSales({callback: () => setDataSelected({})}) }
        >
          <ButtonPersonalized isColumn={ true } classNameIcon="bi bi-archive-fill">
            Cobrar
          </ButtonPersonalized>
        </button>
        <button
          type="button" style={ {margin: '10px 0'} }
          className="button-personalized is-menu text-black text-decoration-none w-75"
          onClick={ openmodalDebts }
        >
          <ButtonPersonalized isColumn={ true } classNameIcon="bi bi-currency-dollar">
            Deuda
          </ButtonPersonalized>
        </button>
      </div>
      <div className="input-group align-items-center mb-3">
        <span id="paying" style={ {marginRight: '10px'} }>Pago: </span>
        <input type="text" className="form-control"
          aria-label="Paying" aria-describedby="paying"
          value={ payment } onChange={ (evt) => handleValidatePayment(evt) }
          disabled={ totalSales === 0 }
        />
      </div>
      <div className="mb-3">
        <span id="paying" style={ {marginRight: '10px'} }>Cambio: </span>
        <span style={ {fontSize: '1.5rem'} }>
          { totalSales < payment
            ? Number(payment - totalSales).toFixed(2)
            : '0.00'
          }
        </span>
      </div>
    </>
  );
};

BoxStatusSales.propTypes = {
  dataSelected: PropTypes.object.isRequired,
  setDataSelected: PropTypes.func.isRequired
};

export default BoxStatusSales;