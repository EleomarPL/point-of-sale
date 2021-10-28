import { useEffect, useState } from 'react';

import SearcherPersonalized from '../../../components/common/SearcherPersonalized';
import TablePersonalized from '../../../components/common/TablePersonalized';
import useDebts from '../../../hooks/useDebts';

const Debts = () => {
  const [searcher, setSearcher] = useState('');
  const [dataDebts, setDataDebts] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const {getDebtsByKeyword} = useDebts();

  useEffect(() => {
    getDebtsByKeyword({value: searcher});
  }, [searcher]);
  useEffect(() => {
    window.electron.on('render:get-debts', (err, data) => {
      if (!err) {
        console.log('error get debts');
        return null;
      }
      if (data)
        setDataDebts(data);
    });

    return () => {
      window.electron.removeAllListeners('render:get-debts');
    };
  }, []);

  let header = [
    'Codigo', 'Nombre', 'Apellido Paterno',
    'Apellido Materno', 'Deuda'
  ];
  let properties = [
    'id', 'name', 'lastName',
    'motherLastName', 'totalDebts'
  ];
  return (
    <div className="w-100">
      <div className="d-flex justify-content-center mt-1">
        <SearcherPersonalized
          placeholder="Nombre"
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