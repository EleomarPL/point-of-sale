import { useEffect, useState, lazy, Suspense } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import {openmodalCreateEditProvider} from '../../components/modals/ModalCreateEditProvider';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';
import useProvider from '../../hooks/useProvider';

const ModalCreateEditProvider = lazy(() => import('../../components/modals/ModalCreateEditProvider'));

const Provider = () => {
  const [searcher, setSearcher] = useState('');
  const [dataProvider, setDataProvider] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isCreateProvider, setIsCreateProvider] = useState(true);
  const {getProviders} = useProvider();

  useEffect(() => {
    // Run provider search
    getProviders({keyword: searcher, limit: 50}).then(response => {
      if (response) setDataProvider(response);
    });
  }, [searcher]);

  // Data lists to create the table
  let header = [
    'Codigo', 'Empresa', 'Nombre',
    'Apellido paterno', 'Apellido materno'
  ];
  let properties = [
    'code', 'company', 'name',
    'lastName', 'motherLastName'
  ];

  // List to create the buttons on the left
  let listProviders = [
    {
      classNameIcon: 'bi bi-person-plus-fill',
      text: 'Agregar',
      onClick: () => {
        setIsCreateProvider(true);
        setSearcher('');
        openmodalCreateEditProvider();
      }
    },
    {
      classNameIcon: 'bi bi-person-lines-fill',
      text: 'Modificar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        setIsCreateProvider(false);
        setSearcher('');
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
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalCreateEditProvider
          dataSelected={ dataSelected }
          dataProvider={ dataProvider }
          setDataProvider={ setDataProvider }
          isCreateProvider={ isCreateProvider }
          setDataSelected={ setDataSelected }
        />
      </Suspense>
    </div>
  );
};

export default Provider;