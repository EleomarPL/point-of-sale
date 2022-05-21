import {
  isObjectValuesNull, validateLength
} from '../../services/validations/generalValidations';

const useValidationProvider = () => {

  const rules = {
    company: {
      min: 2,
      max: 30
    },
    name: {
      min: 2,
      max: 40
    },
    lastName: {
      min: 2,
      max: 40
    },
    motherLastName: {
      min: 2,
      max: 40
    }
  };

  const validateCreationProvider = ({event}) => {
    const dataString = {
      company: {
        name: 'Empresa',
        minLength: rules.company.min,
        maxLength: rules.company.max,
        value: event.target[0].value
      },
      name: {
        name: 'Nombre',
        minLength: rules.name.min,
        maxLength: rules.name.max,
        value: event.target[1].value
      },
      lastName: {
        name: 'Apellido paterno',
        minLength: rules.lastName.min,
        maxLength: rules.lastName.max,
        value: event.target[2].value
      },
      motherLastName: {
        name: 'Apellido materno',
        minLength: rules.motherLastName.min,
        maxLength: rules.motherLastName.max,
        value: event.target[3].value
      }
    };

    if (isObjectValuesNull(dataString)) return false;
    if (!validateLength(dataString)) return false;

    return true;
  };

  const validateEditProvider = ({event}) => {
    const dataString = {
      name: {
        name: 'Nombre',
        minLength: rules.name.min,
        maxLength: rules.name.max,
        value: event.target[1].value
      },
      lastName: {
        name: 'Apellido paterno',
        minLength: rules.lastName.min,
        maxLength: rules.lastName.max,
        value: event.target[2].value
      },
      motherLastName: {
        name: 'Apellido materno',
        minLength: rules.motherLastName.min,
        maxLength: rules.motherLastName.max,
        value: event.target[3].value
      }
    };

    if (isObjectValuesNull(dataString)) return false;
    if (!validateLength(dataString)) return false;

    return true;
  };
  
  return {
    validateCreationProvider, validateEditProvider
  };
};

export default useValidationProvider;