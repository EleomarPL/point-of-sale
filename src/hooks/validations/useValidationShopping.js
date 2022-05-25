import { notifyInfo } from '../../consts/notifications';
import {
  isObjectValuesInteger, isObjectValuesNull, isObjectValuesNumber,
  validateLength
} from '../../services/validations/generalValidations';

const useValidationShopping = () => {
  const validatePossiblePurchase = ({event}) => {
    const dataString = {
      article: {
        name: 'Producto',
        minLength: 2,
        maxLength: 100,
        value: event.target[1].value
      }
    };
    const dataInteger = {
      code: {
        name: 'Codigo',
        minLength: 2,
        maxLength: 20,
        value: event.target[0].value
      },
      amount: {
        name: 'Cantidad',
        minLength: 0,
        maxLength: 6,
        value: event.target[4].value
      },
      stock: {
        name: 'Existencia',
        minLength: 0,
        maxLength: 6,
        value: event.target[5].value
      }
    };
    const dataNumber = {
      purchasePrice: {
        name: 'Precio Compra',
        minLength: 0,
        maxLength: 6,
        value: event.target[2].value
      },
      salesPrice: {
        name: 'Precio Venta',
        minLength: 0,
        maxLength: 6,
        value: event.target[3].value
      }
    };

    if (isObjectValuesNull({...dataString, ...dataInteger, ...dataNumber})) return false;
    if (!validateLength({...dataString, ...dataInteger, ...dataNumber})) return false;
    if (!isObjectValuesInteger(dataInteger)) return false;
    if (!isObjectValuesNumber(dataNumber)) return false;
    if (!event.target[7].value) {
      notifyInfo('Debe agregar al menos un proveedor');
      return false;
    }

    return true;
  };

  return {
    validatePossiblePurchase
  };
};

export default useValidationShopping;