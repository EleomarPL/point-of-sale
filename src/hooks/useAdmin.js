const useAdmin = () => {
  const updatePasswordAdmin = ({id, oldPassword, newPassword}) => {
    window.electron.send('main:update-password-admin', {id, oldPassword, newPassword});
  };
  const updateUsernameAdmin = ({id, username, password}) => {
    window.electron.send('main:update-username-admin', {id, username, password});
  };
  const insertAdmin = ({name, lastName, motherLastName, age, isAMan, username, password}) => {
    window.electron.send('main:insert-admin', {
      name, lastName, motherLastName, age, isAMan, username, password
    });
  };
  
  return {
    updatePasswordAdmin, updateUsernameAdmin, insertAdmin
  };
};

export default useAdmin;