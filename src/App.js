import {lazy, Suspense} from 'react';
import {HashRouter, Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Helmet from 'react-helmet';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto';

import {AuthProvider} from './contexts/Auth';
import PublicRoute from './components/router/PublicRouter';
import MyRouter from './components/router/MyRouter';
import AdminRouter from './components/router/AdminRouter';
import SpinnerLoadingPage from './components/common/SpinnerLoadingPage';

const Home = lazy(() => import('./pages/Home'));
const My = lazy(() => import('./pages/My'));
const Admin = lazy(() => import('./pages/Admin'));

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Switch>
          <PublicRoute exact path="/">
            <Suspense fallback={ <SpinnerLoadingPage /> }>
              <Helmet>
                <title>Inicio | Punto de venta</title>
              </Helmet>
              <Home />
            </Suspense>
          </PublicRoute>
          <MyRouter path="/my">
            <Suspense fallback={ <SpinnerLoadingPage /> }>
              <Helmet>
                <title>Cajero | Punto de venta</title>
              </Helmet>
              <My />
            </Suspense>
          </MyRouter>
          <AdminRouter path="/admin">
            <Suspense fallback={ <SpinnerLoadingPage /> }>
              <Admin />
            </Suspense>
          </AdminRouter>
        </Switch>
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