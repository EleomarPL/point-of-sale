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
    getProviders({keyword: searcher, limit: 50});
  }, [searcher]);
  useEffect(() => {
    window.electron.on('render:get-provider', (err, data) => {
      if (!err) {
        console.log('error get providers');
        return null;
      }
      if (data)
        setDataProvider(data.map(provider => {
          return {...provider, code: provider.id};
        }));
    });

    return () => {
      window.electron.removeAllListeners('render:get-provider');
    };
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
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalCreateEditProvider
          dataProvider={ dataSelected }
          isCreateProvider={ isCreateProvider }
          setDataSelected={ setDataSelected }
        />
      </Suspense>
    </div>
  );
};

export default Provider;