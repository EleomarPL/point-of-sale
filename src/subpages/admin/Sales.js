import { HashRouter, Switch } from 'react-router-dom';
import {lazy, Suspense} from 'react';

import NavigationAdmin from '../../components/views/NavigationAdmin';
import {routesAdminSales} from '../../data/routesAdminSales';
import AdminRouter from '../../components/router/AdminRouter';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';

const Standard = lazy(() => import('./sales/Standard'));
const Stock = lazy(() => import('./sales/Stock'));
const Debts = lazy(() => import('./sales/Debts'));


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
            <Suspense fallback={ <SpinnerLoadingPage /> }>
              <Standard />
            </Suspense>
          </AdminRouter>
          <AdminRouter exact path="/admin/sales/stock">
            <Suspense fallback={ <SpinnerLoadingPage /> }>
              <Stock />
            </Suspense>
          </AdminRouter>
          <AdminRouter exact path="/admin/sales/debts">
            <Suspense fallback={ <SpinnerLoadingPage /> }>
              <Debts />
            </Suspense>
          </AdminRouter>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default Sales;