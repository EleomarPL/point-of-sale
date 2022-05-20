import { isObjectValuesNull } from '../../services/validations/generalValidations';

const useValidationLogin = () => {
  const validateLogin = ({event}) => {
    const dataString = {
      username: {
        value: event.target[0].value
      },
      password: {
        value: event.target[1].value
      }
    };

    if (isObjectValuesNull(dataString)) return false;
    
    return true;
  };
  
  return {
    validateLogin
  };
};

export default useValidationLogin;