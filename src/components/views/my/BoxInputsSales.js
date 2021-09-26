import { useState } from 'react';
import PropTypes from 'prop-types';

import DebounceInput from '../../common/DebounceInput';

const BoxInputsSales = ({setDataSelected}) => {

  const [article, setArticle] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleChangeState = ({set, value}) => {
    set(value);
  };

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center mb-1">
        <div className="w-75 input-group d-flex align-items-center">
          <label className="px-2 fw-bold">Producto: </label>
          <DebounceInput placeholder="Producto"
            value={ article } setValue={ setArticle }
          />
        </div>
      </div>
      <div className="w-100 d-flex justify-content-around">
        <div className="input-group align-items-center" style={ {minWidth: '30vw'} }>
          <span id="name" className="px-1">Nombre: </span>
          <input type="text" className="form-control"
            placeholder="Nombre" aria-label="Name"
            aria-describedby="name" value={ name }
            style={ {backgroundColor: '#f6eded'} } disabled
            onChange={ (evt) => handleChangeState({set: setName, value: evt.target.value}) }
          />
        </div>
        <div className="input-group align-items-center">
          <span id="stock" className="px-1">Existencia: </span>
          <input type="text" className="form-control"
            placeholder="Existencia" aria-label="Stock"
            aria-describedby="stock" value={ stock }
            style={ {backgroundColor: '#f6eded'} } disabled
            onChange={ (evt) => handleChangeState({set: setStock, value: evt.target.value}) }
          />
        </div>
        <div className="input-group align-items-center">
          <span id="amount" className="px-1">Cantidad: </span>
          <input type="text" className="form-control"
            placeholder="Cantidad" aria-label="Amount"
            aria-describedby="amount" value={ amount }
            style={ {backgroundColor: '#f6eded'} }
            onChange={ (evt) => handleChangeState({set: setAmount, value: evt.target.value}) }
          />
        </div>
        <div className="input-group align-items-center">
          <span id="price" className="px-1">Precio: </span>
          <input type="text" className="form-control"
            placeholder="Precio" aria-label="Price"
            aria-describedby="price" value={ price }
            style={ {backgroundColor: '#f6eded'} } disabled
            onChange={ (evt) => handleChangeState({set: setPrice, value: evt.target.value}) }
          />
        </div>
        <button
          type="button" style={ {fontSize: '1.6rem', borderRadius: '10px', marginLeft: '5px'} }
          className="border-0"
        >
          <i className="bi bi-plus-circle-fill"></i>
        </button>
      </div>
    </div>
  );
};

BoxInputsSales.propTypes = {
  setDataSelected: PropTypes.func.isRequired
};

export default BoxInputsSales;