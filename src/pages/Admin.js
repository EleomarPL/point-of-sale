import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ButtonPersonalized from '../components/common/ButtonPersonalized';
import NavigationAdmin from '../components/views/NavigationAdmin';
import {routesAdmin} from '../data/routesAdmin';
import Shopping from '../subpages/admin/Shopping';

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
        <div style={ {minHeight: '62vh', overflow: 'auto'} }>
          <Switch>
            <Route exact path="/admin">
              <p>Proveedor</p>
            </Route>
            <Route path="/admin/shopping">
              <Shopping />
            </Route>
            <Route path="/admin/products">
              <p>Productos</p>
            </Route>
            <Route path="/admin/employees">
              <p>Empleados</p>
            </Route>
            <Route path="/admin/sales">
              <p>Ventas</p>
            </Route>
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