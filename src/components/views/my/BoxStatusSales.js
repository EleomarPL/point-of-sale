import PropTypes from 'prop-types';

import ButtonPersonalized from '../../common/ButtonPersonalized';

const BoxStatusSales = ({dataSelected, setDataSelected}) => {
  return (
    <>
      <div className="d-flex flex-column" style={ {fontSize: '1.6rem'} }>
        <span>Articulo:</span>
        <span>0000.00</span>
        <span className="fw-bold">Total:</span>
        <span className="fw-bold">0000.00</span>
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