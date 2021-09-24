import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import ButtonPersonalized from '../components/common/ButtonPersonalized';
import NavigationAdmin from '../components/views/NavigationAdmin';
import {routesAdmin} from '../data/routesAdmin';
import Provider from '../subpages/admin/Provider';
import Shopping from '../subpages/admin/Shopping';
import Products from '../subpages/admin/Products';
import Employees from '../subpages/admin/Employees';
import Sales from '../subpages/admin/Sales';
import AdminRouter from '../components/router/AdminRouter';

const Admin = () => {

  const handleLogout = () => {
    console.log('logout');
  };

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
              <Provider />
            </AdminRouter>
            <AdminRouter path="/admin/shopping">
              <Shopping />
            </AdminRouter>
            <AdminRouter path="/admin/products">
              <Products />
            </AdminRouter>
            <AdminRouter path="/admin/employees">
              <Employees />
            </AdminRouter>
            <AdminRouter path="/admin/sales">
              <Sales />
            </AdminRouter>
          </Switch>
        </div>
        <div style={ {minHeight: '10vh', backgroundColor: '#D5E1CC'} }>
          <div className="d-flex justify-content-end align-items-center">
            <button
              type="button"
              className="button-personalized is-button-personalized"
              style={ {borderRadius: '10px'} }
              onClick={ handleLogout }
            >
              <ButtonPersonalized classNameIcon="bi bi-box-arrow-left">
                Cerrar Sesión
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </section>
    </HashRouter>
  );
};

export default Admin;