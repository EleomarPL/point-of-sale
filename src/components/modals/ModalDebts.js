import { Modal } from 'bootstrap';
import { NavLink, Switch } from 'react-router-dom';

import { routesModalDebts } from '../../data/routesModalDebts';
import Debts from '../../subpages/admin/sales/Debts';
import AddDebt from '../../subpages/user/modalDebts/AddDebt';
import AddDebtor from '../../subpages/user/modalDebts/AddDebtor';
import ButtonPersonalized from '../common/ButtonPersonalized';
import MyRouter from '../router/MyRouter';

export const openmodalDebts = () => {
  let myModal = new Modal(
    document.getElementById('modalDebts'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalDebts = () => {
  return (
    <div className="modal fade" id="modalDebts"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalDebtsLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style={ {width: '90vw', maxWidth: 'none', height: '90%'} }
      >
        <div className="modal-content" style={ {backgroundColor: '#bed7aa', height: '100%'} }>
          <div className="modal-header my-0 py-0">
            <nav className="col-md-11 d-flex flex-wrap justify-content-evenly">
              { routesModalDebts &&
                routesModalDebts.map( option =>
                  <NavLink
                    key={ option.classNameIcon }
                    to={ option.path } exact
                    className="button-personalized is-menu text-black text-decoration-none py-1"
                    activeClassName="active-admin"
                    style={ {width: '19%', fontSize: '1rem'} }
                  >
                    <ButtonPersonalized
                      isColumn={ true }
                      classNameIcon={ option.classNameIcon }
                    >
                      { option.text }
                    </ButtonPersonalized>
                  </NavLink>
                )
              }
            </nav>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0 m-0 mt-1" style={ {overflow: 'auto'} }>
            <Switch>
              <MyRouter exact path="/my/">
                <AddDebtor />
              </MyRouter>
              <MyRouter exact path="/my/debtors">
                <AddDebt />
              </MyRouter>
              <MyRouter exact path="/my/pay-debt">
                <p>Pagar deuda</p>
              </MyRouter>
              <MyRouter exact path="/my/see-debts">
                <Debts />
              </MyRouter>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDebts;