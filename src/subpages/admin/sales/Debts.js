import React, { useState } from 'react';

import SearcherPersonalized from '../../../components/common/SearcherPersonalized';
import TablePersonalized from '../../../components/common/TablePersonalized';

const Debts = () => {
  const [searcher, setSearcher] = useState('');
  const [dataDebts, setDataDebts] = useState([]);
  const [dataSelected, setDataSelected] = useState({});

  let header = [
    'Codigo', 'Nombre', 'Apellido Paterno',
    'Apellido Materno', 'Deuda'
  ];
  let properties = [
    'code', 'name', 'lastName',
    'motherLastName', 'debt'
  ];
  return (
    <div className="w-100">
      <div className="d-flex justify-content-center mt-1">
        <SearcherPersonalized
          placeholder="Empresa"
          title="Buscar"
          value={ searcher }
          setValue={ setSearcher }
        />
      </div>
      <div className="w-100 mt-1">
        <TablePersonalized
          maxHeight="44vh"
          header={ header }
          listProperties={ properties }
          dataSelected={ dataSelected }
          setDataSelected={ setDataSelected }
          listData={ dataDebts }
        />
      </div>
    </div>
  );
};

export default Debts;