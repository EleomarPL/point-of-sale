import { useEffect, useState } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import ModalCreateEditProvider from '../../components/modals/ModalCreateEditProvider';
import {openmodalCreateEditProvider} from '../../components/modals/ModalCreateEditProvider';

const Provider = () => {
  const [searcher, setSearcher] = useState('');
  const [dataProvider, setDataProvider] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isCreateProvider, setIsCreateProvider] = useState(true);

  useEffect(() => {
    setDataProvider([
      {code: 1, company: 'Company', name: 'Name', lastName: 'LastName', motherLastName: 'MotherLastName'},
      {code: 2, company: 'Company2', name: 'Name2', lastName: 'LastName2', motherLastName: 'MotherLastName2'}
    ]);
  }, []);

  let header = [
    'Codigo', 'Empresa', 'Nombre',
    'Apellido paterno', 'Apellido materno'
  ];
  let properties = [
    'code', 'company', 'name',
    'lastName', 'motherLastName'
  ];

  let listProviders = [
    {
      classNameIcon: 'bi bi-person-plus-fill',
      text: 'Agregar',
      onClick: () => {
        setIsCreateProvider(true);
        openmodalCreateEditProvider();
      }
    },
    {
      classNameIcon: 'bi bi-person-lines-fill',
      text: 'Modificar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        setIsCreateProvider(false);
        openmodalCreateEditProvider();
      }
    }
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
      <GroupPagesAdmin listButtons={ listProviders } >
        <TablePersonalized
          header={ header }
          listProperties={ properties }
          dataSelected={ dataSelected }
          setDataSelected={ setDataSelected }
          listData={ dataProvider }
        />
      </GroupPagesAdmin>
      <ModalCreateEditProvider
        dataProvider={ dataSelected }
        isCreateProvider={ isCreateProvider }
        setDataSelected={ setDataSelected }
      />
    </div>
  );
};

export default Provider;