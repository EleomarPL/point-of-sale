import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Helmet from 'react-helmet';

import NavigationAdmin from '../../components/views/NavigationAdmin';
import { routesAdminSales } from '../../data/routesAdminSales';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';


// Subpages of the admin sales subpage
const Standard = lazy(() => import('./sales/Standard'));
const Stock = lazy(() => import('./sales/Stock'));
const Debts = lazy(() => import('./sales/Debts'));

const Sales = () => {
  return (
    <>
      <div style={ {minHeight: '10vh', backgroundColor: '#c8e1cc'} }
        className="d-flex flex-wrap align-items-center"
      >
        { /*
          Links or navigation to the different subpages of the sales subpage
        */ }
        <NavigationAdmin navigation={ routesAdminSales } />
      </div>
      <div style={ {maxHeight: '52vh', minHeight: '52vh', overflow: 'auto'} }>
        <Routes>
          <Route index
            element={
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Helmet>
                  <title>Ventas Estandar | Administrador | Punto de venta</title>
                </Helmet>
                <Standard />
              </Suspense>
            }
          />
          <Route path="stock"
            element={
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Helmet>
                  <title>Ventas Stock | Administrador | Punto de venta</title>
                </Helmet>
                <Stock />
              </Suspense>
            }
          />
          <Route path="debts"
            element={
              <Suspense fallback={ <SpinnerLoadingPage /> }>
                <Helmet>
                  <title>Deudas | Administrador | Punto de venta</title>
                </Helmet>
                <Debts />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Sales;