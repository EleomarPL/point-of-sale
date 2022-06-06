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

  return { validateUsername, validatePassword };
};

export default useValidationAdmin;