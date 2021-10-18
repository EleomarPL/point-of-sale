const useProvider = () => {
  const createEmployee = ({company, name, lastName, motherLastName}) => {
    window.electron.send('main:insert-provider', {name, lastName, motherLastName, company});
  };
  const getProviders = ({keyword, limit}) => {
    window.electron.send('main:get-provider', {keyword, limit});
  };
  return {
    createEmployee, getProviders
  };
};

export default useProvider;