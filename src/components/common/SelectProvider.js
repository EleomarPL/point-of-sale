import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useProvider from '../../hooks/useProvider';

const SelectProvider = ({ widthSelect = '10%', keyProvider = '', children, setSelect}) => {
  const [providers, setProviders] = useState([]);
  const [providerSelect, setProviderSelect] = useState('');
  const {getProviderForSelect} = useProvider();

  useEffect(() => {
    // Run provider search
    getProviderForSelect().then(response => {
      if (response) {
        setProviders(response);
        setProviderSelect(response[0].id);
        if (setSelect)
          setSelect(response[0].id);
      }
    });
  }, []);
  useEffect(() => {
    if (keyProvider)
      setProviderSelect(keyProvider);
  }, [keyProvider]);

  const handleChangeSelect = (evt) => {
    setProviderSelect(evt.target.value);
    if (setSelect)
      setSelect(evt.target.value);
  };

  return (
    <>
      <span className="mx-1">Proveedor: </span>
      <select className="form-select mx-1" style={ {width: widthSelect} }
        value={ providerSelect } onChange={ handleChangeSelect }
      >
        { children }
        { providers &&
          providers.map(provider =>
            <option value={ provider.id }
              key={ provider.id }
              name={ provider.company }
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
  keyProvider: PropTypes.string,
  children: PropTypes.node,
  setSelect: PropTypes.func
};

export default SelectProvider;