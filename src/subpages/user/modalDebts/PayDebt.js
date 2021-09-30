import { useState } from 'react';

import BoxInputsPayDebt from '../../../components/views/my/BoxInputsPayDebt';
import TablePayDebt from '../../../components/views/my/TablePayDebt';

const PayDebt = () => {
  const [listDebts, setListDebts] = useState([]);

  let header = [ 'Casilla', 'Codigo Deuda', 'Codigo Articulo', 'Amount', 'Price', 'Total' ];

  return (
    <div className="row col-md-12 px-0" style={ {minHeight: '100%', maxHeight: '100%'} }>
      <div className="col-md-8">
        <TablePayDebt
          header={ header } listDebts={ listDebts }
          setListDebts={ setListDebts }
        />
      </div>
      <div className="col-md-4">
        <BoxInputsPayDebt listDebts={ listDebts } setListDebts={ setListDebts } />
      </div>
    </div>
  );
};

export default PayDebt;