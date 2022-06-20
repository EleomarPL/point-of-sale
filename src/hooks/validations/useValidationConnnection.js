import { isObjectValuesInteger, isObjectValuesNull, validateLength } from '../../services/validations/generalValidations';

const useValidationConnnection = () => {
  const rules = {
    host: {
      min: 2,
      max: 70
    },
    username: {
      min: 3,
      max: 50
    },
    password: {
      min: 4,
      max: 30
    },
    database: {
      min: 3,
      max: 50
    }
  };

  const validateCreationLogForMariadb = ({event}) => {
    const dataString = {
      host: {
        name: 'Host',
        minLength: rules.host.min,
        maxLength: rules.host.max,
        value: event.target[0].value
      },
      username: {
        name: 'Usuario',
        minLength: rules.username.min,
        maxLength: rules.username.max,
        value: event.target[2].value
      },
      password: {
        name: 'Contraseña',
        minLength: rules.password.min,
        maxLength: rules.password.max,
        value: event.target[3].value
      },
      database: {
        name: 'Base de datos',
        minLength: rules.database.min,
        maxLength: rules.database.max,
        value: event.target[4].value
      }
    };
    const dataInteger = {
      port: {
        name: 'Puerto',
        minLength: 0,
        maxLength: 6,
        value: event.target[1].value
      }
    };

    if (isObjectValuesNull({...dataString, ...dataInteger})) return false;
    if (!validateLength(dataString)) return false;
    if (!isObjectValuesInteger(dataInteger)) return false;

    return true;
  };

  return {
    validateCreationLogForMariadb
  };
};

export default useValidationConnnection;