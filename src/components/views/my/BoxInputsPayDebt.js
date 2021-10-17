import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { isNumberValue } from '../../../services/validations/generalValidations';
import ButtonPersonalized from '../../common/ButtonPersonalized';
import SpinnerButtonLoading from '../../common/SpinnerButtonLoading';

const BoxInputsPayDebt = ({listDebts, setListDebts}) => {
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
              <select className="form-select" id="select-debt">
                <option value="" hidden>Seleccionar aquí</option>
              </select>
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
          disabled={ payment < total }
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
  setListDebts: PropTypes.func.isRequired
};

export default BoxInputsPayDebt;