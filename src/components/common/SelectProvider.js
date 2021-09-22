import React from 'react';

const SelectProvider = () => {
  return (
    <>
      <span className="mx-1">Proveedor: </span>
      <select className="form-select mx-1" style={ {width: '10%'} }>
        <option value="default">Provider</option>
      </select>
    </>
  );
};

export default SelectProvider;