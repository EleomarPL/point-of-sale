import { Modal } from 'bootstrap';
import { NavLink, Routes, Route } from 'react-router-dom';

import { routesModalDebts } from '../../data/routesModalDebts';
import Debts from '../../subpages/admin/sales/Debts';
import AddDebt from '../../subpages/user/modalDebts/AddDebt';
import AddDebtor from '../../subpages/user/modalDebts/AddDebtor';
import PayDebt from '../../subpages/user/modalDebts/PayDebt';
import ButtonPersonalized from '../common/ButtonPersonalized';

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
                    to={ option.path } end
                    className="button-personalized is-menu text-black text-decoration-none py-1"
                    style={ ({isActive}) => ({
                      width: '19%', fontSize: '1rem',
                      backgroundColor: isActive && 'var(--active)'
                    }) }
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
            <Routes>
              <Route index
                element={ <AddDebtor /> }
              />
              <Route path="debtors"
                element={ <AddDebt /> }
              />
              <Route path="pay-debt"
                element={ <PayDebt /> }
              />
              <Route path="see-debts"
                element={ <Debts /> }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDebts;