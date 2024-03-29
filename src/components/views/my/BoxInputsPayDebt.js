import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import { isNumberValue } from '../../../services/validations/generalValidations';
import ButtonPersonalized from '../../common/ButtonPersonalized';
import SelectDebtor from '../../common/SelectDebtor';
import SpinnerButtonLoading from '../../common/SpinnerButtonLoading';
import useDebts from '../../../hooks/useDebts';
import Auth from '../../../contexts/Auth';

const BoxInputsPayDebt = ({listDebts, debtorSelect, setDebtorSelect}) => {
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { payDebt } = useDebts();
  const { userData } = useContext(Auth);

  useEffect(() => {
    setTotal (
      listDebts.reduce((acc, currentValue) => {
        if (currentValue.box)
          return acc + currentValue.total;
        return acc;
      }, 0)
    );
  }, [listDebts]);

  const handlePayDebt = () => {
    setIsLoading(true);

    const reOrderListDebts = listDebts.
      filter(debt => debt.box).
      map(debt => {
        return {
          ...debt,
          idDebt: debt.debtId,
          idArticle: debt.articleId,
          salesPrice: debt.price
        };
      });
      
    payDebt({idUser: userData.id, salesRecords: reOrderListDebts, total}).then(response => {
      setIsLoading(false);
      if (response) {
        setDebtorSelect('none');
        setPayment(0);
        setChange(0);
      }
    });
  };

  const handlePayment = (evt) => {
    if (isNumberValue({ value: evt.target.value, name: 'Pago' })) {
      let number = parseFloat(evt.target.value);
      setPayment(number);
      if (number >= total)
        setChange(number - total);
      else
        setChange(0);
    } else {
      setPayment(0);
      setChange(0);
    }
  };

  return (
    <div className="d-flex flex-column">
      <table>
        <tbody>
          <tr>
            <td style={ {paddingBottom: '2rem', verticalAlign: 'middle'} }><label htmlFor="select-debt" className="px-2">Seleccionar Deudor:</label></td>
            <td style={ {paddingBottom: '2rem'} }>
              <SelectDebtor
                id="select-debt" widthSelect="auto"
                debtorSelect={ debtorSelect } setDebtorSelect={ setDebtorSelect }
              />
            </td>
          </tr>
          <tr className="fw-bold" style={ {fontSize: '1.3rem'} }>
            <td style={ {paddingBottom: '2rem'} }>Total Deuda:</td>
            <td style={ {paddingBottom: '2rem'} }>{ total }</td>
          </tr>
          <tr>
            <td style={ {paddingBottom: '2rem'} }>Pago: </td>
            <td style={ {paddingBottom: '2rem'} }>
              <input className="form-control" type="text"
                value={ payment } onChange={ (evt) => handlePayment(evt) }
              />
            </td>
          </tr>
          <tr>
            <td style={ {paddingBottom: '2rem'} }>Cambio:</td>
            <td style={ {paddingBottom: '2rem'} }>{ change }</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-evenly mt-4">
        <button type="button" className="button-btn-modals"
          disabled={ isLoading || payment < total || listDebts.length === 0 }
          onClick={ handlePayDebt }
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

BoxInputsPayDebt.propTypes = {
  listDebts: PropTypes.array.isRequired,
  setListDebts: PropTypes.func.isRequired,
  debtorSelect: PropTypes.string,
  setDebtorSelect: PropTypes.func
};

export default BoxInputsPayDebt;