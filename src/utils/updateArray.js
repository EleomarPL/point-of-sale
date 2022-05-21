export const updateArray = ({array, item, key = 'id'}) => {
  const index = array.findIndex(element => element[key] === item[key]);
  if (index !== -1) {
    array[index] = item;
  }
  return array;
};