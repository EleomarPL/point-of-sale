const useProvider = () => {
  const createEmployee = ({company, name, lastName, motherLastName}) => {
    window.electron.send('main:insert-provider', {name, lastName, motherLastName, company});
  };
  return {
    createEmployee
  };
};

export default useProvider;