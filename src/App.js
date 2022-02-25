import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto';

import { AuthProvider } from './contexts/Auth';
import PublicRoute from './components/router/PublicRouter';
import MyRouter from './components/router/MyRouter';
import AdminRouter from './components/router/AdminRouter';
import SpinnerLoadingPage from './components/common/SpinnerLoadingPage';


/*
  These are the main pages, the login (Home), cashier (My) and administrator (Admin)
*/
const Home = lazy(() => import('./pages/Home'));
const My = lazy(() => import('./pages/My'));
const Admin = lazy(() => import('./pages/Admin'));

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route index
            element={
              <PublicRoute>
                <Suspense fallback={ <SpinnerLoadingPage /> }>
                  <Helmet>
                    <title>Inicio | Punto de venta</title>
                  </Helmet>
                  <Home />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route path="/my/*"
            element={
              <MyRouter>
                <Suspense fallback={ <SpinnerLoadingPage /> }>
                  <Helmet>
                    <title>Cajero | Punto de venta</title>
                  </Helmet>
                  <My />
                </Suspense>
              </MyRouter>
            }
          />
          <Route path="/admin/*"
            element={
              <AdminRouter>
                <Suspense fallback={ <SpinnerLoadingPage /> }>
                  <Admin />
                </Suspense>
              </AdminRouter>
            }
          >
          </Route>
        </Routes>
      </HashRouter>
      <ToastContainer position="top-right"
        autoClose={ 5000 } hideProgressBar={ false }
        newestOnTop={ false } closeOnClick
        rtl={ false } pauseOnFocusLoss
        draggable={ false } pauseOnHover
      />
    </AuthProvider>
  );
};

export default App;