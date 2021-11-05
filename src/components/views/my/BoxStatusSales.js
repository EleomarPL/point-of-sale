import PropTypes from 'prop-types';
import { useContext } from 'react';

import ButtonPersonalized from '../../common/ButtonPersonalized';
import { openmodalDebts } from '../../modals/ModalDebts';
import SalesContext from '../../../contexts/Sales';

const BoxStatusSales = ({dataSelected, setDataSelected}) => {
  const {listSales} = useContext(SalesContext);

  return (
    <>
      <div className="d-flex flex-column" style={ {fontSize: '1.6rem'} }>
        <span>Articulo:</span>
        <span>
          { dataSelected.idArticle ? Number(dataSelected.total).toFixed(2) : '0.00' }
        </span>
        <span className="fw-bold">Total:</span>
        <span className="fw-bold">
          { listSales &&
            Number(listSales.reduce((acc, current) => acc + current.total, 0)).toFixed(2)
          }
        </span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <button
          type="button"
          className="button-personalized is-menu text-black text-decoration-none w-75"
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
        />
      </div>
      <div className="mb-3">
        <span id="paying" style={ {marginRight: '10px'} }>Cambio: </span>
        <span style={ {fontSize: '1.5rem'} }>0000.00</span>
      </div>
    </>
  );
};

BoxStatusSales.propTypes = {
  dataSelected: PropTypes.object.isRequired,
  setDataSelected: PropTypes.func.isRequired
};

export default BoxStatusSales;