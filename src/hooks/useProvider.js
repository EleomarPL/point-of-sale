const useProvider = () => {
  const createProvider = ({company, name, lastName, motherLastName}) => {
    window.electron.send('main:insert-provider', {name, lastName, motherLastName, company});
  };
  const getProviders = ({keyword, limit}) => {
    window.electron.send('main:get-provider', {keyword, limit});
  };
  const editProvider = ({id, name, lastName, motherLastName}) => {
    window.electron.send('main:update-provider', {id, name, lastName, motherLastName});
  };
  return {
    createProvider, getProviders, editProvider
  };
};

export default useProvider;