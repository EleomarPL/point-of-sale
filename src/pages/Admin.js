import { HashRouter, Switch } from 'react-router-dom';
import {lazy, Suspense} from 'react';

import NavigationAdmin from '../components/views/NavigationAdmin';
import {routesAdmin} from '../data/routesAdmin';
import AdminRouter from '../components/router/AdminRouter';
import LogoutBox from '../components/views/LogoutBox';
import SpinnerLoadingPage from '../components/common/SpinnerLoadingPage';

const Provider = lazy(() => import('../subpages/admin/Provider'));
const Shopping = lazy(() => import('../subpages/admin/Shopping'));
const Products = lazy(() => import('../subpages/admin/Products'));
const Employees = lazy(() => import('../subpages/admin/Employees'));
const Sales = lazy(() => import('../subpages/admin/Sales'));

const Admin = () => {
  return (
    <HashRouter>
      <section className="col-md-12" style={ {backgroundColor: '#BED7AA'} }>
        <div style={ {minHeight: '5vh'} }>
          1
        </div>
        <div style={ {minHeight: '10vh', backgroundColor: '#CBD8C4'} }
          className="d-flex align-items-center"
        >
          <i className="bi bi-person-circle" style={ {fontSize: '2.5rem', marginRight: '1rem'} }></i>
          <span style={ {fontSize: '2rem'} } >Administrador</span>
        </div>
        <div style={ {minHeight: '13vh', backgroundColor: '#D5E1CC'} }
          className="d-flex flex-wrap align-items-center"
        >
          <NavigationAdmin navigation={ routesAdmin } />
        </div>
        <div style={ {maxHeight: '62vh', minHeight: '62vh', overflow: 'auto'} }>
          <Switch>
            <AdminRouter exact path="/admin">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Provider />
              </Suspense>
            </AdminRouter>
            <AdminRouter path="/admin/shopping">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Shopping />
              </Suspense>
            </AdminRouter>
            <AdminRouter path="/admin/products">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Products />
              </Suspense>
            </AdminRouter>
            <AdminRouter path="/admin/employees">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Employees />
              </Suspense>
            </AdminRouter>
            <AdminRouter path="/admin/sales">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Sales />
              </Suspense>
            </AdminRouter>
          </Switch>
        </div>
        <LogoutBox />
      </section>
    </HashRouter>
  );
};

export default Admin;