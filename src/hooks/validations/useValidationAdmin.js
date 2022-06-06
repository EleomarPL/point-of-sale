import { notifyWarning } from '../../consts/notifications';

const useValidationAdmin = () => {
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

  return { validateUsername };
};

export default useValidationAdmin;