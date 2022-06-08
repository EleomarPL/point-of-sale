import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const BoxInputsDebtors = ({dataSelected, isEdit = false}) => {
  const [gender, setGender] = useState(true);

  const nameInputRef = useRef({});
  const lastnameInputRef = useRef({});
  const motherLastnameInputRef = useRef({});
  const addressInputRef = useRef({});

  useEffect(() => {
    nameInputRef.current.value = dataSelected?.name ?? '';
    lastnameInputRef.current.value = dataSelected?.lastName ?? '';
    motherLastnameInputRef.current.value = dataSelected?.motherLastName ?? '';
    addressInputRef.current.value = dataSelected?.address ?? '';
    setGender(dataSelected.gender === 'M');
  }, [dataSelected]);

  return (
    <div className="w-100 overflow-auto row row-cols-lg-1 g-1">
      <div className="input-group row row-cols-lg-3 g-1 text-truncate">
        <label className="col-form-label" htmlFor="name">Nombre</label>
        <input
          placeholder="Nombre" ref={ nameInputRef }
          id="name" type="text"
          aria-label="Name" aria-describedby="name"
          className="form-control flex-fill" style={ {backgroundColor: '#f6eded'} }
          disabled={ isEdit }
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label" htmlFor="lastname">Apellido Paterno</label>
        <input
          placeholder="Apellido Paterno" ref={ lastnameInputRef }
          id="lastname" type="text"
          aria-label="Lastname" aria-describedby="lastname"
          className="form-control flex-fill" style={ {backgroundColor: '#f6eded'} }
          disabled={ isEdit }
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label" htmlFor="motherlastname">Apellido Materno</label>
        <input
          placeholder="Apellido Materno" ref={ motherLastnameInputRef }
          id="motherlastname" type="text"
          aria-label="Motherlastname" aria-describedby="motherlastname"
          className="form-control flex-fill" style={ {backgroundColor: '#f6eded'} }
          disabled={ isEdit }
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label" htmlFor="address">Domicilio</label>
        <input
          placeholder="Domicilio" ref={ addressInputRef }
          id="address" type="text"
          aria-label="Address" aria-describedby="address"
          className="form-control flex-fill" style={ {backgroundColor: '#f6eded'} }
        />
      </div>
      <div>
        <div>
          <input className="form-check-input" type="radio"
            id="radio1"
            checked={ gender } disabled={ isEdit }
            onChange={ () => setGender(!gender) }
          />
          <label className="form-check-label" htmlFor="radio1">
            Masculino
          </label>
        </div>
        <div>
          <input className="form-check-input" type="radio"
            id="radio2"
            checked={ !gender } disabled={ isEdit }
            onChange={ () => setGender(!gender) }
          />
          <label className="form-check-label" htmlFor="radio2">
            Femenino
          </label>
        </div>
      </div>
    </div>
  );
};

BoxInputsDebtors.propTypes = {
  dataSelected: PropTypes.object.isRequired,
  isEdit: PropTypes.bool
};

export default BoxInputsDebtors;