import {
  isNumberValue, isObjectValuesNull
} from '../../services/validations/generalValidations';

const useValidationArticle = () => {

  const validateModifyArticle = ({event}) => {
    const dataNumeric = {
      salesPrice: {
        name: 'Precio Venta',
        value: event.target[2].value
      }
    };

    if (isObjectValuesNull(dataNumeric)) return false;
    if (!isNumberValue(dataNumeric)) return false;

    return false;
  };
  
  return {
    validateModifyArticle
  };
};

export default useValidationArticle;