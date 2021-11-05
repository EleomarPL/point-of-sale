import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { inputAddDebtor } from '../../../data/my/inputAddDebtor';


const BoxInputsDebtors = ({dataSelected, isEdit = false}) => {
  const [values, setValues] = useState({
    code: '', name: '', lastName: '',
    motherLastName: '', address: '', gender: 'M'
  });
  const [gender, setGender] = useState(true);

  useEffect(() => {
    setValues({
      ...dataSelected
    });
    setGender(dataSelected.gender === 'M');
  }, [dataSelected]);

  const handleChangeValue = ({property, value}) => {
    setValues({
      ...values,
      [property]: value
    });
  };

  return (
    <table className="overflow-auto">
      <tbody>
        { inputAddDebtor &&
          inputAddDebtor.map(inputDebtor =>
            <tr
              key={ inputDebtor.id }
            >
              <td style={ {paddingBottom: '2rem', verticalAlign: 'middle'} }>{ inputDebtor.placeholder }: </td>
              <td style={ {paddingBottom: '2rem'} }>
                <input type={ inputDebtor.type } className="form-control"
                  placeholder={ inputDebtor.placeholder } aria-label={ inputDebtor.id.toUpperCase() }
                  aria-describedby={ inputDebtor.id } value={ values[inputDebtor.id] || '' }
                  onChange={ (evt) => handleChangeValue({property: inputDebtor.id, value: evt.target.value}) }
                  style={ {backgroundColor: '#f6eded'} }
                  disabled={ isEdit && inputDebtor.id !== 'address' }
                />
              </td>
            </tr>
          )
        }
        <tr>
          <td>Sexo: </td>
          <td>
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
          </td>
        </tr>
      </tbody>
    </table>
  );
};

BoxInputsDebtors.propTypes = {
  dataSelected: PropTypes.object.isRequired,
  isEdit: PropTypes.bool
};

export default BoxInputsDebtors;