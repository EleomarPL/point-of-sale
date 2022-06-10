import { isObjectValuesNull, validateLength } from '../../services/validations/generalValidations';

const useValidationDebtor = () => {
  const rules = {
    name: {
      min: 2,
      max: 50
    },
    lastName: {
      min: 2,
      max: 50
    },
    motherLastName: {
      min: 2,
      max: 50
    },
    address: {
      min: 6,
      max: 80
    }
  };

  const validateCreationDebtor = ({event}) => {
    let dataString = {
      name: {
        name: 'Nombre',
        minLength: rules.name.min,
        maxLength: rules.name.max,
        value: event.target[0].value
      },
      lastName: {
        name: 'Apellido paterno',
        minLength: rules.lastName.min,
        maxLength: rules.lastName.max,
        value: event.target[1].value
      },
      motherLastName: {
        name: 'Apellido materno',
        minLength: rules.motherLastName.min,
        maxLength: rules.motherLastName.max,
        value: event.target[2].value
      },
      address: {
        name: 'Dirección',
        minLength: rules.address.min,
        maxLength: rules.address.max,
        value: event.target[3].value
      }
    };
    
    if (isObjectValuesNull(dataString)) return false;
    if (!validateLength(dataString)) return false;

    return true;
  };
  const validateUpdateDebtor = ({event}) => {
    let dataString = {
      address: {
        name: 'Dirección',
        minLength: rules.address.min,
        maxLength: rules.address.max,
        value: event[3].value
      }
    };

    if (isObjectValuesNull(dataString)) return false;
    if (!validateLength(dataString)) return false;

    return true;
  };

  return {
    validateCreationDebtor, validateUpdateDebtor
  };
};

export default useValidationDebtor;