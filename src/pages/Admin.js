import { HashRouter, Switch } from 'react-router-dom';
import {lazy, Suspense} from 'react';
import Helmet from 'react-helmet';

import NavigationAdmin from '../components/views/NavigationAdmin';
import {routesAdmin} from '../data/routesAdmin';
import AdminRouter from '../components/router/AdminRouter';
import LogoutBox from '../components/views/LogoutBox';
import SpinnerLoadingPage from '../components/common/SpinnerLoadingPage';
import OptionBarAdmin from '../components/views/OptionBarAdmin';
import ModalUpdateUsernameAdmin from '../components/modals/ModalUpdateUsernameAdmin';

const Provider = lazy(() => import('../subpages/admin/Provider'));
const Shopping = lazy(() => import('../subpages/admin/Shopping'));
const Products = lazy(() => import('../subpages/admin/Products'));
const Employees = lazy(() => import('../subpages/admin/Employees'));
const Sales = lazy(() => import('../subpages/admin/Sales'));

const Admin = () => {
  return (
    <HashRouter>
      <section className="col-md-12" style={ {backgroundColor: '#BED7AA'} }>
        <div
          style={ {
            minHeight: '4vh', maxHeight: '4vh',
            backgroundColor: '#CBD8C4', borderBottom: '1px solid #334630'
          } }
        >
          <OptionBarAdmin />
        </div>
        <div style={ {minHeight: '10vh', maxHeight: '10vh', backgroundColor: '#CBD8C4'} }
          className="d-flex align-items-center"
        >
          <i className="bi bi-person-circle" style={ {fontSize: '2.5rem', marginRight: '1rem'} }></i>
          <span style={ {fontSize: '2rem'} } >Administrador</span>
        </div>
        <div style={ {minHeight: '13vh', maxHeight: '13vh', backgroundColor: '#D5E1CC'} }
          className="d-flex flex-wrap align-items-center"
        >
          <NavigationAdmin navigation={ routesAdmin } />
        </div>
        <div style={ {maxHeight: '63vh', minHeight: '63vh', overflow: 'auto'} }>
          <Switch>
            <AdminRouter exact path="/admin">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Helmet>
                  <title>Proveedores | Administrador | Punto de venta</title>
                </Helmet>
                <Provider />
              </Suspense>
            </AdminRouter>
            <AdminRouter path="/admin/shopping">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Helmet>
                  <title>Compras | Administrador | Punto de venta</title>
                </Helmet>
                <Shopping />
              </Suspense>
            </AdminRouter>
            <AdminRouter path="/admin/products">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Helmet>
                  <title>Articulos | Administrador | Punto de venta</title>
                </Helmet>
                <Products />
              </Suspense>
            </AdminRouter>
            <AdminRouter path="/admin/employees">
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Helmet>
                  <title>Empleados | Administrador | Punto de venta</title>
                </Helmet>
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
      <ModalUpdateUsernameAdmin />
    </HashRouter>
  );
};

export default Admin;