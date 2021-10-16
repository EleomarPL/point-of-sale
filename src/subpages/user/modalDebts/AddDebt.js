import { useState } from 'react';

import ButtonPersonalized from '../../../components/common/ButtonPersonalized';
import SpinnerButtonLoading from '../../../components/common/SpinnerButtonLoading';

const AddDebt = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDebt = () => {
    setIsLoading(true);
  };

  return (
    <div className="w-100">
      <div className="w-100 text-center my-2" style={ {fontSize: '1.8rem'} }>
        <span>Total Deuda: <strong>000.00</strong></span>
      </div>
      <div className="d-flex justify-content-center align-items-center my-2">
        <label htmlFor="select-debt" className="px-2">Seleccionar Deudor:</label>
        <select className="form-select w-50" id="select-debt">
          <option value="" hidden>Seleccionar aquí</option>
        </select>
      </div>
      <div className="w-100 d-flex justify-content-center"
        style={ {position: 'absolute', bottom: '1rem'} }
      >
        <button type="button" className="button-btn-modals"
          style={ {marginRight: '2rem'} }
          onClick={ handleAddDebt } disabled={ isLoading }
        >
          <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
            <span>
              { isLoading &&
                <SpinnerButtonLoading />
              }
              Aceptar
            </span>
          </ButtonPersonalized>
        </button>
        <button type="button" className="button-btn-modals"
          data-bs-dismiss="modal"
        >
          <ButtonPersonalized classNameIcon="bi bi-x-circle-fill" isColumn={ true }>
            Salir
          </ButtonPersonalized>
        </button>
      </div>
    </div>
  );
};

export default AddDebt;