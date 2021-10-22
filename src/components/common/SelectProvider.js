import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useProvider from '../../hooks/useProvider';

const SelectProvider = ({ widthSelect = '10%', keyProvider = ''}) => {
  const [providers, setProviders] = useState([]);
  const [providerSelect, setProviderSelect] = useState('');
  const {getProviderForSelect} = useProvider();

  useEffect(() => {
    getProviderForSelect();
    window.electron.on('render:get-provider-forselect', (err, data) => {
      if (!err) {
        console.log('error get article by id');
        return null;
      }
      if (data[0] !== undefined) {
        setProviders(data);
        setProviderSelect(data[0].id);
      }
    });

    return () => {
      window.electron.removeAllListeners('render:get-provider-forselect');
    };
  }, []);
  useEffect(() => {
    if (keyProvider)
      setProviderSelect(keyProvider);
  }, [keyProvider]);

  return (
    <>
      <span className="mx-1">Proveedor: </span>
      <select className="form-select mx-1" style={ {width: widthSelect} }
        value={ providerSelect } onChange={ (evt) => setProviderSelect(evt.target.value) }
      >
        { providers &&
          providers.map(provider =>
            <option value={ provider.id }
              key={ provider.id }
            >
              { provider.company }
            </option>
          )
        }
      </select>
    </>
  );
};

SelectProvider.propTypes = {
  widthSelect: PropTypes.string,
  keyProvider: PropTypes.string
};

export default SelectProvider;