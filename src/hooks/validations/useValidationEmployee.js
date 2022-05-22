import {
  isObjectValuesNull, validateLength
} from '../../services/validations/generalValidations';

const useValidationEmployee = () => {

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
    username: {
      min: 4,
      max: 50
    },
    password: {
      min: 4,
      max: 30
    }
  };

  const validateCreationEmployee = ({event}) => {
    const dataString = {
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
      username: {
        name: 'Usuario',
        minLength: rules.username.min,
        maxLength: rules.username.max,
        value: event.target[3].value
      },
      password: {
        name: 'Apellido materno',
        minLength: rules.password.min,
        maxLength: rules.password.max,
        value: event.target[4].value
      }
    };

    if (isObjectValuesNull(dataString)) return false;
    if (!validateLength(dataString)) return false;

    return true;
  };
  const validateUpdateEmployee = ({event, itWillPasswordChange}) => {
    const dataString = {
      username: {
        name: 'Usuario',
        minLength: rules.username.min,
        maxLength: rules.username.max,
        value: event.target[4].value
      },
      password: {
        name: 'Contraseña',
        minLength: rules.password.min,
        maxLength: rules.password.max,
        value: itWillPasswordChange ? event.target[5].value : ''
      }
    };
    if (!itWillPasswordChange)
      delete dataString.password;

    if (isObjectValuesNull(dataString)) return false;
    if (!validateLength(dataString)) return false;

    return true;
  };
  
  return {
    validateCreationEmployee, validateUpdateEmployee
  };
};

export default useValidationEmployee;