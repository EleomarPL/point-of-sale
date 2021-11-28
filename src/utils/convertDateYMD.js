// utility to add zero to date

export const convertDateYYYYMMDD = ({day, month, year}) => {
  let monthWitZero = ('0' + month).slice(-2);
  let dayWithZero = ('0' + day).slice(-2);

  return `${year}-${monthWitZero}-${dayWithZero}`;
};