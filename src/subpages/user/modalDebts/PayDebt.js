import { useEffect, useState } from 'react';

import BoxInputsPayDebt from '../../../components/views/my/BoxInputsPayDebt';
import TablePayDebt from '../../../components/views/my/TablePayDebt';
import useDebts from '../../../hooks/useDebts';

const PayDebt = () => {
  const [listDebts, setListDebts] = useState([]);
  const [debtorSelect, setDebtorSelect] = useState('none');
  const {getDebtsFromDebtor} = useDebts();

  useEffect(() => {
    if (debtorSelect !== 'none')
      getDebtsFromDebtor({idDebtor: debtorSelect});
    else
      setListDebts([]);
  }, [debtorSelect]);
  useEffect(() => {
    window.electron.on('render:get-debts-from-debtor', (err, data) => {
      if (!err) {
        console.log('error get debts from debtor');
        return null;
      }
      
      if (data)
        setListDebts(data.map(debts => {
          return {...debts, box: true};
        }));
    });

    return () => {
      window.electron.removeAllListeners('render:get-debts-from-debtor');
    };
  }, []);

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