import { useContext, useEffect, useState } from 'react';

import ButtonPersonalized from '../../../components/common/ButtonPersonalized';
import SelectDebtor from '../../../components/common/SelectDebtor';
import SpinnerButtonLoading from '../../../components/common/SpinnerButtonLoading';
import SalesContext from '../../../contexts/Sales';

const AddDebt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [debtorSelect, setDebtorSelect] = useState('none');
  const [total, setTotal] = useState(0);
  const {listSales} = useContext(SalesContext);

  useEffect(() => {
    setTotal(listSales.reduce((acc, current) => current.total + acc, 0));
  }, [listSales]);

  const handleAddDebt = () => {
    setIsLoading(true);
  };

  return (
    <div className="w-100">
      <div className="w-100 text-center my-2" style={ {fontSize: '1.8rem'} }>
        <span>Total Deuda: <strong>{ total.toFixed(2) }</strong></span>
      </div>
      <div className="d-flex justify-content-center align-items-center my-2">
        <label htmlFor="select-debt" className="px-2">Seleccionar Deudor:</label>
        <SelectDebtor debtorSelect={ debtorSelect } setDebtorSelect={ setDebtorSelect }
          id="select-debt"
        />
      </div>
      <div className="w-100 d-flex justify-content-center"
        style={ {position: 'absolute', bottom: '1rem'} }
      >
        <button type="button" className="button-btn-modals"
          style={ {marginRight: '2rem'} }
          onClick={ handleAddDebt } disabled={ isLoading || debtorSelect === 'none' }
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