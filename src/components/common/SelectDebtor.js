import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useDebts from '../../hooks/useDebts';

const SelectDebtor = ({ widthSelect = '50%', id, debtorSelect, setDebtorSelect}) => {
  const [debtors, setDebtors] = useState([]);
  const {getDebtors} = useDebts();

  useEffect(() => {
    // Run provider search
    getDebtors({value: ''});

    // Wait for result when getting debtors search
    window.electron.on('render:get-debtors', (err, data) => {
      if (!err) {
        console.log('error get debtors');
        return null;
      }
      
      if (data)
        setDebtors(data.map(debtor => {
          return {
            ...debtor, code: debtor.id
          };
        }));
    });
    // Delete previous events
    return () => {
      window.electron.removeAllListeners('render:get-debtors');
    };
  }, []);
  
  return (
    <>
      <select className="form-select mx-1" style={ {width: widthSelect} }
        value={ debtorSelect } onChange={ (evt) => setDebtorSelect(evt.target.value) }
        id={ id }
      >
        <option value="none" hidden>Seleccione un deudor</option>
        { debtors &&
          debtors.map(debtor =>
            <option value={ debtor.id }
              key={ debtor.id }
            >
              { `${debtor.name} ${debtor.lastName}` }
            </option>
          )
        }
      </select>
    </>
  );
};

SelectDebtor.propTypes = {
  widthSelect: PropTypes.string,
  id: PropTypes.string,
  debtorSelect: PropTypes.string,
  setDebtorSelect: PropTypes.func
};

export default SelectDebtor;