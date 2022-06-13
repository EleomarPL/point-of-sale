import { useState } from 'react';
import { Modal } from 'bootstrap';

import ButtonPersonalized from '../common/ButtonPersonalized';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';
import useAdmin from '../../hooks/useAdmin';
import useValidationAdmin from '../../hooks/validations/useValidationAdmin';

export const openmodalCreateAdmin = () => {
  let myModal = new Modal(
    document.getElementById('modalCreateAdmin'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalCreateAdmin = () => {
  const [radio1, setRadio1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { insertAdmin } = useAdmin();
  const { validateCreationAdmin } = useValidationAdmin();

  const handleSubmitEmployee = (evt) => {
    evt.preventDefault();

    if (validateCreationAdmin({event: evt})) {
      setIsLoading(true);
      insertAdmin({
        name: evt.target[0].value, lastName: evt.target[1].value,
        motherLastName: evt.target[2].value,
        username: evt.target[3].value, password: evt.target[4].value,
        age: evt.target[7].value, isAMan: evt.target[5].checked
      }).then(response => {
        setIsLoading(false);
        if (response) {
          let myModal = Modal.getInstance( document.getElementById('modalCreateAdmin') );
          myModal.hide();
        }
      });
    }
  };

  return (
    <div className="modal fade" id="modalCreateAdmin"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalCreateAdminLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={ {backgroundColor: '#bed7aa'} }>
          <div className="modal-header">
            <h5 className="modal-title m-auto" id="modalCreateAdminLabel">
              Agregar Administrador
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={ handleSubmitEmployee } id="form-create-admin">
              <div className="input-group row row-cols-lg-3 g-1">
                <label className="col-form-label">Nombre</label>
                <input type="text" className="form-control mb-2"
                  placeholder="Nombre" aria-label="Name"
                  aria-describedby="name"
                  style={ {backgroundColor: '#f6eded'} }
                />
              </div>
              <div className="input-group row row-cols-lg-3 g-1">
                <label className="col-form-label">Apellido Paterno</label>
                <input type="text" className="form-control mb-2"
                  placeholder="Apellido Paterno" aria-label="Lastname"
                  aria-describedby="lastname"
                  style={ {backgroundColor: '#f6eded'} }
                />
              </div>
              <div className="input-group row row-cols-lg-3 g-1">
                <label className="col-form-label">Apellido Materno</label>
                <input type="text" className="form-control mb-2"
                  placeholder="Apellido Materno" aria-label="MotherLastname"
                  aria-describedby="motherlastname"
                  style={ {backgroundColor: '#f6eded'} }
                />
              </div>
              <div className="input-group row row-cols-lg-3 g-1">
                <label className="col-form-label">Usuario</label>
                <input type="text" className="form-control mb-2"
                  placeholder="Usuario" aria-label="Username"
                  aria-describedby="username"
                  style={ {backgroundColor: '#f6eded'} }
                />
              </div>
              <div className="input-group row row-cols-lg-3 g-1">
                <label className="col-form-label">Contraseña</label>
                <input type="password" className="form-control mb-2"
                  placeholder="Contraseña" aria-label="Password"
                  aria-describedby="password"
                  style={ {backgroundColor: '#f6eded'} }
                />
              </div>
              <div className="input-group row row-cols-lg-3 g-1">
                <label className="col-form-label">Sexo</label>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio"
                      name="flexRadioDefault" id="flexRadioDefault1"
                      checked={ radio1 } onChange={ () => setRadio1(!radio1) }
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Masculino
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio"
                      name="flexRadioDefault" id="flexRadioDefault2"
                      checked={ !radio1 } onChange={ () => setRadio1(!radio1) }
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Femenino
                    </label>
                  </div>
                </div>
              </div>
              <div className="input-group row row-cols-lg-3 g-1">
                <label className="col-form-label">Edad</label>
                <select className="form-select">
                  {
                    Array(42).fill(0).map((_, i) =>
                      <option
                        key={ i }
                        value={ i + 18 }
                      >
                        { i + 18 }
                      </option>
                    )
                  }
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-evenly">
            <button type="button" className="button-btn-modals"
              data-bs-dismiss="modal"
            >
              <ButtonPersonalized classNameIcon="bi bi-x-circle-fill" isColumn={ true }>
                Salir
              </ButtonPersonalized>
            </button>
            <button type="submit" className="button-btn-modals"
              form="form-create-admin" disabled={ isLoading }
            >
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                <span>
                  { isLoading &&
                    <SpinnerButtonLoading />
                  }
                  Agregar Administrador
                </span>
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateAdmin;