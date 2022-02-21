import { Routes, Route } from 'react-router-dom';
import {lazy, Suspense} from 'react';
import { Helmet } from 'react-helmet';

import NavigationAdmin from '../components/views/NavigationAdmin';
import { routesAdmin } from '../data/routesAdmin';
import LogoutBox from '../components/views/LogoutBox';
import SpinnerLoadingPage from '../components/common/SpinnerLoadingPage';
import OptionBarAdmin from '../components/views/OptionBarAdmin';

const ModalUpdateUsernameAdmin = lazy(() => import('../components/modals/ModalUpdateUsernameAdmin'));
const ModalUpdatePasswordAdmin = lazy(() => import('../components/modals/ModalUpdatePasswordAdmin'));
const ModalShowAllPurchases = lazy(() => import('../components/modals/ModalShowAllPurchases'));
const ModalShowAllArticles = lazy(() => import('../components/modals/ModalShowAllArticles'));
const ModalShowAllSales = lazy(() => import('../components/modals/ModalShowAllSales'));

const Provider = lazy(() => import('../subpages/admin/Provider'));
const Shopping = lazy(() => import('../subpages/admin/Shopping'));
const Products = lazy(() => import('../subpages/admin/Products'));
const Employees = lazy(() => import('../subpages/admin/Employees'));
const Sales = lazy(() => import('../subpages/admin/Sales'));

const Admin = () => {
  return (
    <>
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
          <Routes>
            <Route index
              element={
                <Suspense fallback={ <SpinnerLoadingPage /> }>
                  <Helmet>
                    <title>Proveedores | Administrador | Punto de venta</title>
                  </Helmet>
                  <Provider />
                </Suspense>
              }
            />
            <Route path="shopping"
              element={
                <Suspense fallback={ <SpinnerLoadingPage /> }>
                  <Helmet>
                    <title>Compras | Administrador | Punto de venta</title>
                  </Helmet>
                  <Shopping />
                </Suspense>
              }
            />
            <Route path="products"
              element={
                <Suspense fallback={ <SpinnerLoadingPage /> }>
                  <Helmet>
                    <title>Artículos | Administrador | Punto de venta</title>
                  </Helmet>
                  <Products />
                </Suspense>
              }
            />
            <Route path="employees"
              element={
                <Suspense fallback={ <SpinnerLoadingPage /> }>
                  <Helmet>
                    <title>Empleados | Administrador | Punto de venta</title>
                  </Helmet>
                  <Employees />
                </Suspense>
              }
            />
            <Route path="sales/*"
              element={
                <Suspense fallback={ <SpinnerLoadingPage /> }>
                  <Sales />
                </Suspense>
              }
            />
          </Routes>
        </div>
        <LogoutBox />
      </section>
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalUpdateUsernameAdmin />
        <ModalUpdatePasswordAdmin />
        <ModalShowAllPurchases />
        <ModalShowAllArticles />
        <ModalShowAllSales />
      </Suspense>
    </>
  );
};

export default Admin;