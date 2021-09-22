import React from 'react';
import PropTypes from 'prop-types';
import SelectProvider from './SelectProvider';

const SearcherSelectPersonalized = ({setValue}) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-center align-items-center">
      <span className="mx-2">Buscar: </span>
      <select className="form-select mx-2" style={ {width: '20%'} }>
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
      <SelectProvider />
    </div>
  );
};

SearcherSelectPersonalized.propTypes = {
  setValue: PropTypes.func
};

export default SearcherSelectPersonalized;