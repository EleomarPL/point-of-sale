import { useState, useEffect, useRef } from 'react';

import ButtonPersonalized from '../../../components/common/ButtonPersonalized';
import TablePersonalized from '../../../components/common/TablePersonalized';
import BoxInputsDebtors from '../../../components/views/my/BoxInputsDebtor';
import SpinnerButtonLoading from '../../../components/common/SpinnerButtonLoading';
import useDebts from '../../../hooks/useDebts';
import { updateArray } from '../../../utils/updateArray';
import useValidationDebtor from '../../../hooks/validations/useValidationDebtor';

const AddDebtor = () => {
  const [listDebtors, setListDebtors] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const formRef = useRef({});
  const { getDebtors, insertDebtor, updateDebtor } = useDebts();
  const { validateCreationDebtor, validateUpdateDebtor } = useValidationDebtor();

  useEffect(() => {
    getDebtors({value: ''}).then(response => {
      if (response) setListDebtors(response);
    });
  }, []);
  
  // Data lists to create the table
  let header = [
    'Codigo', 'Nombre', 'Apellido Paterno',
    'Apellido Materno', 'Domicilio', 'Sexo'
  ];
  let properties = [
    'code', 'name', 'lastName',
    'motherLastName', 'address', 'genderUpdated'
  ];

  const handleAddDebtor = (evt) => {
    evt.preventDefault();

    if (validateCreationDebtor({event: evt})) {
      setIsLoadingAdd(true);
      insertDebtor({
        name: evt.target[0].value, lastName: evt.target[1].value,
        motherLastName: evt.target[2].value,
        address: evt.target[3].value,
        isAMan: evt.target[4].checked
      }).then(response => {
        if (response) {
          setIsLoadingAdd(false);
          setListDebtors([
            {
              code: response.insertId,
              id: response.insertId,
              name: evt.target[0].value,
              lastName: evt.target[1].value,
              motherLastName: evt.target[2].value,
              address: evt.target[3].value,
              genderUpdated: evt.target[4].checked ? 'Masculino' : 'Femenino'
            },
            ...listDebtors
          ]);
          formRef.current.reset();
        }
      });
    }
  };
  const handleEditDebtor = (evt) => {
    const valuesInputs =
      evt.target.form || evt.target.parentNode.form || evt.target.parentNode.parentNode.form;

    if (validateUpdateDebtor({event: valuesInputs})) {
      setIsLoadingEdit(true);
      updateDebtor({idDebtor: dataSelected.code, address: valuesInputs[3].value}).then(response => {
        setIsLoadingEdit(false);
        if (response) {
          const arrayUpdate = updateArray({
            array: [...listDebtors],
            item: {
              ...dataSelected,
              address: valuesInputs[3].value
            },
            key: 'code'
          });
          setListDebtors(arrayUpdate);
          setDataSelected({});
          formRef.current.reset();
        }
      });
    }
  };

  return (
    <div className="w-100">
      <div className="row col-md-12 px-0" style={ {minHeight: '67vh', maxHeight: '67vh'} }>
        <div className="col-md-9">
          <TablePersonalized
            header={ header }
            listProperties={ properties }
            listData={ listDebtors }
            dataSelected={ dataSelected }
            setDataSelected={ setDataSelected }
          />
        </div>
        <div className="col-md-3">
          <form className="d-flex flex-column justify-content-center" onSubmit={ handleAddDebtor }
            ref={ formRef }
          >
            <BoxInputsDebtors
              dataSelected={ dataSelected }
              isEdit={ dataSelected.code !== undefined }
            />
            <div className="d-flex justify-content-evenly mt-4">
              <button type="submit" className="button-btn-modals"
                disabled={ isLoadingAdd || dataSelected.code !== undefined }
              >
                <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                  <span>
                    { isLoadingAdd &&
                      <SpinnerButtonLoading />
                    }
                    Agregar
                  </span>
                </ButtonPersonalized>
              </button>
              <button type="button" className="button-btn-modals"
                disabled={ isLoadingEdit || dataSelected.code === undefined }
                onClick={ (evt) => handleEditDebtor(evt) }
              >
                <ButtonPersonalized classNameIcon="bi bi-pencil-fill" isColumn={ true }>
                  <span>
                    { isLoadingEdit &&
                      <SpinnerButtonLoading />
                    }
                    Editar
                  </span>
                </ButtonPersonalized>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDebtor;