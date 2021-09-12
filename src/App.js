import React from 'react';
import {HashRouter, Switch} from 'react-router-dom';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource/roboto';

import {AuthProvider} from './contexts/Auth';
import PublicRoute from './components/router/PublicRouter';
import MyRouter from './components/router/MyRouter';
import AdminRouter from './components/router/AdminRouter';
import Home from './pages/Home';
import My from './pages/My';
import Admin from './pages/Admin';

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Switch>
          <PublicRoute exact path="/">
            <Home />
          </PublicRoute>
          <MyRouter path="/my">
            <My />
          </MyRouter>
          <AdminRouter path="/admin">
            <Admin />
          </AdminRouter>
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;