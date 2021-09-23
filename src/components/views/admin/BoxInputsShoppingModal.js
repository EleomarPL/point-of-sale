import React from 'react';

import {inputShopping} from '../../../data/admin/modalShopping';
import SelectProvider from '../../common/SelectProvider';

const BoxInputsShoppingModal = () => {
  return (
    <div className="w-100">
      <table className="w-100">
        <tbody>
          { inputShopping &&
            inputShopping.map(data =>
              <tr key={ data.id }>
                <td>{ data.placeholder }</td>
                <td>
                  <input type={ data.type } className="form-control"
                    placeholder={ data.placeholder } aria-label={ data.id.toUpperCase() }
                    aria-describedby={ data.id }
                    style={ {backgroundColor: '#f6eded'} }
                  />
                </td>
              </tr>
            )
          }
          <tr>
            <td>Fecha de Caducidad</td>
            <td>
              <input type="datetime-local" className="form-control"
                aria-label="DateofExpiry"
                aria-describedby="ate-of-expiry"
                style={ {backgroundColor: '#f6eded'} }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex align-items-center justify-content-between">
        <SelectProvider widthSelect="65%" />
      </div>
    </div>
  );
};

export default BoxInputsShoppingModal;