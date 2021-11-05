import { useState, useEffect } from 'react';

import ButtonPersonalized from '../../../components/common/ButtonPersonalized';
import TablePersonalized from '../../../components/common/TablePersonalized';
import BoxInputsDebtors from '../../../components/views/my/BoxInputsDebtor';
import SpinnerButtonLoading from '../../../components/common/SpinnerButtonLoading';
import useDebts from '../../../hooks/useDebts';
import { isObjectValuesNull, validateLength } from '../../../services/validations/generalValidations';
import { notifySuccess } from '../../../consts/notifications';

const AddDebtor = () => {
  const [listDebtors, setListDebtors] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const {getDebtors, insertDebtor} = useDebts();

  useEffect(() => {
    getDebtors({value: ''});

    window.electron.on('render:get-debtors', (err, data) => {
      if (!err) {
        console.log('error get debtors');
        return null;
      }
      
      if (data)
        setListDebtors(data.map(debtor => {
          return {
            ...debtor, code: debtor.id,
            genderUpdated: debtor.gender === 'M' ? 'Masculino' : 'Femenino'
          };
        }));
    });
    window.electron.on('render:insert-debtor', (err, data) => {
      if (!err) {
        console.log('error get debts');
        return null;
      }
      if (data) {
        setIsLoadingAdd(false);
        notifySuccess('Deudor agregado exitosamente');
        window.electron.send('main:get-debtors', {value: ''});
      }
    });
  

    return () => {
      window.electron.removeAllListeners('render:get-debtors');
      window.electron.removeAllListeners('render:insert-debtor');
    };
  }, []);

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

    let dataDebtorForm = {
      name: {
        name: 'Nombre',
        minLength: 2,
        maxLength: 50,
        value: evt.target[0].value
      },
      lastName: {
        name: 'Apellido paterno',
        minLength: 2,
        maxLength: 50,
        value: evt.target[1].value
      },
      motherLastName: {
        name: 'Apellido materno',
        minLength: 2,
        maxLength: 50,
        value: evt.target[2].value
      },
      address: {
        name: 'Dirección',
        minLength: 6,
        maxLength: 80,
        value: evt.target[3].value
      }
    };
    if ( !isObjectValuesNull(dataDebtorForm) && validateLength(dataDebtorForm) ) {
      setIsLoadingAdd(true);
      insertDebtor({
        name: dataDebtorForm.name.value, lastName: dataDebtorForm.lastName.value,
        motherLastName: dataDebtorForm.motherLastName.value,
        address: dataDebtorForm.address.value,
        isAMan: evt.target[4].checked
      });
    }
  };
  const handleEditDebtor = () => {
    setIsLoadingEdit(true);
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
          <form className="d-flex flex-column justify-content-center" onSubmit={ handleAddDebtor }>
            <BoxInputsDebtors
              dataSelected={ dataSelected }
              setDataSelected={ setDataSelected }
            />
            <div className="d-flex justify-content-evenly mt-4">
              <button type="submit" className="button-btn-modals"
                disabled={ isLoadingAdd }
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
                disabled={ dataSelected.code === undefined }
                onClick={ handleEditDebtor }
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