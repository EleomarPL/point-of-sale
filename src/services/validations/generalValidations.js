import validator from 'validator';
import {notifyWarning} from '../../consts/notifications';

export const isObjectValuesNull = (objectData) => {
  let isNull = false;

  Object.keys(objectData).forEach(key => {
    if (validator.isEmpty(objectData[key].value)) {
      isNull = true;
      return isNull;
    }
  });
  if (isNull)
    notifyWarning('Rellene todos los campos');

  return isNull;
};
export const validateLength = ( objectData ) => {
  let isCorrectValue = true;

  Object.keys(objectData).forEach(key => {
    
    let value = objectData[key].value.length;

    if (value < objectData[key].minLength || value > objectData[key].maxLength) {
      isCorrectValue = false;
      notifyWarning(`${objectData[key].name} debe tener de ${objectData[key].minLength} a ${objectData[key].maxLength} caracteres`);
      return isCorrectValue;
    }
  });
  
  return isCorrectValue;
};
export const isNumberValue = ({ name, value }) => {
  let isNumber = true;
  if (!validator.isNumeric(value)) {
    isNumber = false;
    notifyWarning(`${name} debe ser numérico`);
  }

  return isNumber;
};
export const isValidateEmail = (email) => {
  let isValidate = true;
  
  if ( !validator.isEmail(email) ) {
    isValidate = false;
    notifyWarning('Ingresa un correo electronico valido');
  }

  return isValidate;
};
export const isInteger = ({name, value}) => {
  let isNumber = true;
  if (!validator.isInt(value)) {
    isNumber = false;
    notifyWarning(`${name} debe ser un número entero`);
  }
  return isNumber;
};