import { useContext, useEffect, useState } from 'react';
import { Modal } from 'bootstrap';

import ButtonPersonalized from '../../../components/common/ButtonPersonalized';
import SelectDebtor from '../../../components/common/SelectDebtor';
import SpinnerButtonLoading from '../../../components/common/SpinnerButtonLoading';
import SalesContext from '../../../contexts/Sales';
import useDebts from '../../../hooks/useDebts';
import Auth from '../../../contexts/Auth';

const AddDebt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [debtorSelect, setDebtorSelect] = useState('none');
  const [total, setTotal] = useState(0);
  const { addDebt } = useDebts();
  const { listSales, setListSales } = useContext(SalesContext);
  const { userData } = useContext(Auth);

  useEffect(() => {
    setTotal(listSales.reduce((acc, current) => current.total + acc, 0));
  }, [listSales]);

  const handleAddDebt = () => {
    let myModal = Modal.getInstance( document.getElementById('modalDebts') );

    if (debtorSelect !== 'none') {
      setIsLoading(true);
      
      addDebt({idDebtor: debtorSelect, idUser: userData.id, listArticles: listSales}).then(response => {
        setIsLoading(false);
        if (response) setListSales([]);
      });
      myModal.hide();
    }
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
          onClick={ handleAddDebt } disabled={ isLoading || debtorSelect === 'none' || total === 0 }
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