import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { handleConvertDate } from '../../utils/convertDate';
import SelectProvider from './SelectProvider';

const SearcherSelectPersonalized = ({setValue, children}) => {
  const [optionSelected, setOptionSelected] = useState('day');
  const [optionProvider, setOptionProvider] = useState('all');

  useEffect(() => {
    setValue(`${handleConvertDate(optionSelected)} ${optionProvider}`);
  }, [optionProvider, optionSelected]);

  return (
    <div className="w-100 d-flex flex-wrap justify-content-center align-items-center">
      <span className="mx-2">Buscar: </span>
      <select className="form-select mx-2" style={ {width: '20%'} }
        value={ optionSelected } onChange={ (evt) => setOptionSelected(evt.target.value) }
      >
        <option value="day">Día</option>
        <option value="week">Semana</option>
        <option value="fortnight">Quincena</option>
        <option value="month">Mes</option>
        <option value="bimester">Bimestre</option>
        <option value="trimester">Trimestre</option>
        <option value="quarter">Cuatrimestre</option>
        <option value="semester">Semestre</option>
        <option value="year">Año</option>
      </select>
      <SelectProvider widthSelect="30%" setSelect={ setOptionProvider }>
        { children }
      </SelectProvider>
    </div>
  );
};

SearcherSelectPersonalized.propTypes = {
  setValue: PropTypes.func,
  children: PropTypes.node
};

export default SearcherSelectPersonalized;