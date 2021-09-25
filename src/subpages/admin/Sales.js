import { HashRouter, Switch } from 'react-router-dom';

import NavigationAdmin from '../../components/views/NavigationAdmin';
import {routesAdminSales} from '../../data/routesAdminSales';
import Standard from './sales/Standard';
import Stock from './sales/Stock';
import Debts from './sales/Debts';
import AdminRouter from '../../components/router/AdminRouter';

const Sales = () => {
  return (
    <HashRouter>
      <div style={ {minHeight: '10vh', backgroundColor: '#c8e1cc'} }
        className="d-flex flex-wrap align-items-center"
      >
        <NavigationAdmin navigation={ routesAdminSales } />
      </div>
      <div style={ {maxHeight: '52vh', minHeight: '52vh', overflow: 'auto'} }>
        <Switch>
          <AdminRouter exact path="/admin/sales">
            <Standard />
          </AdminRouter>
          <AdminRouter exact path="/admin/sales/stock">
            <Stock />
          </AdminRouter>
          <AdminRouter exact path="/admin/sales/debts">
            <Debts />
          </AdminRouter>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default Sales;