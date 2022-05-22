export const updateArray = ({array, item, key = 'id'}) => {
  const index = array.findIndex(element => Number(element[key]) === Number(item[key]));
  if (index !== -1) {
    array[index] = {
      ...array[index],
      ...item
    };
  }
  return array;
};
export const updateStatusArray = ({array, key = 'id', valueKey, keyStatus = 'status', willItLocked = true}) => {
  const index = array.findIndex(element => Number(element[key]) === Number(valueKey));
  if (index !== -1) {
    array[index][keyStatus] = willItLocked ? 'Bloqueado' : 'Activo';
  }
  return array;
};