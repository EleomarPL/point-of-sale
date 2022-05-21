const useProvider = () => {
  const createProvider = async({company, name, lastName, motherLastName}) => {
    const data = await window.electron.invoke('main:insert-provider', {name, lastName, motherLastName, company});
    if (!data) return false;

    return data;
  };
  const getProviders = async({keyword, limit}) => {
    const data = await window.electron.invoke('main:get-provider', {keyword, limit});
    if (!data) return false;
    
    const result = data.map(provider => {
      return {...provider, code: provider.id};
    });
    
    return result;
  };
  const editProvider = async({id, name, lastName, motherLastName}) => {
    const data = await window.electron.invoke('main:update-provider', {id, name, lastName, motherLastName});
    if (!data) return false;

    return data.affectedRows;
  };
  const getProviderForSelect = () => {
    window.electron.send('main:get-provider-forselect');
  };
  return {
    createProvider, getProviders, editProvider, getProviderForSelect
  };
};

export default useProvider;