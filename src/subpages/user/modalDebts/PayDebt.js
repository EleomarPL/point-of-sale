import { useEffect, useState } from 'react';

import BoxInputsPayDebt from '../../../components/views/my/BoxInputsPayDebt';
import TablePayDebt from '../../../components/views/my/TablePayDebt';
import useDebts from '../../../hooks/useDebts';

const PayDebt = () => {
  const [listDebts, setListDebts] = useState([]);
  const [debtorSelect, setDebtorSelect] = useState('none');
  const { getDebtsFromDebtor } = useDebts();

  useEffect(() => {
    // Run provider search
    if (debtorSelect !== 'none')
      getDebtsFromDebtor({idDebtor: debtorSelect}).then(response => {
        if (response) {
          setListDebts(response.map(debts => (
            {...debts, box: true}
          )));
        }
      });
    else
      setListDebts([]);
  }, [debtorSelect]);
  
  // Data lists to create the table
  let header = [ 'Casilla', 'Codigo Deuda', 'Codigo Articulo', 'Articulo', 'Amount', 'Price', 'Total' ];

  return (
    <div className="row col-md-12 px-0" style={ {minHeight: '100%', maxHeight: '100%'} }>
      <div className="col-md-8">
        <TablePayDebt
          header={ header } listDebts={ listDebts }
          setListDebts={ setListDebts }
        />
      </div>
      <div className="col-md-4">
        <BoxInputsPayDebt listDebts={ listDebts } setListDebts={ setListDebts }
          debtorSelect={ debtorSelect } setDebtorSelect={ setDebtorSelect }
        />
      </div>
    </div>
  );
};

export default PayDebt;