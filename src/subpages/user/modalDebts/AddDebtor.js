import { useState } from 'react';
import ButtonPersonalized from '../../../components/common/ButtonPersonalized';
import TablePersonalized from '../../../components/common/TablePersonalized';
import BoxInputsDebtors from '../../../components/views/my/BoxInputsDebtor';
import SpinnerButtonLoading from '../../../components/common/SpinnerButtonLoading';

const AddDebtor = () => {
  const [listDebtors, setListDebtors] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  let header = [
    'Codigo', 'Nombre', 'Apellido Paterno',
    'Apellido Materno', 'Domicilio', 'Sexo'
  ];
  let properties = [
    'code', 'name', 'lastName',
    'motherLastName', 'address', 'gender'
  ];

  const handleAddDebtor = (evt) => {
    evt.preventDefault();
    
    setIsLoadingAdd(true);
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