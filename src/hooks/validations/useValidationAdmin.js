import { notifyWarning } from '../../consts/notifications';
import { isObjectValuesNull, validateLength } from '../../services/validations/generalValidations';

const useValidationAdmin = () => {
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

  const validateCreationAdmin = ({event}) => {
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
        name: 'Contraseña',
        minLength: rules.password.min,
        maxLength: rules.password.max,
        value: event.target[4].value
      }
    };

    if (isObjectValuesNull(dataString)) return false;
    if (!validateLength(dataString)) return false;

    return true;
  };
  const validateUsername = ({password, username}) => {
    if (!password || !username) {
      notifyWarning('Rellene todos los campos');
      return false;
    }
    if (username.length < 6 || username > 50) {
      notifyWarning('Nuevo usuario debe tener de 6 a 50 caracteres');
      return false;
    }

    return true;
  };
  const validatePassword = ({oldPassword, newPassword, confirmNewPassword}) => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      notifyWarning('Rellene todos los campos');
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      notifyWarning('Las contraseñas no coinciden');
      return false;
    }
    if (confirmNewPassword.length < 6 || confirmNewPassword.length > 50) {
      notifyWarning('Nueva contraseña debe tener de 6 a 50 caracteres');
      return false;
    }

    return true;
  };

  return { validateUsername, validatePassword, validateCreationAdmin };
};

export default useValidationAdmin;