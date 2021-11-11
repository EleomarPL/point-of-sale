const useAdmin = () => {
  const updatePasswordAdmin = ({id, oldPassword, newPassword}) => {
    window.electron.send('main:update-password-admin', {id, oldPassword, newPassword});
  };
  const updateUsernameAdmin = ({id, username, password}) => {
    window.electron.send('main:update-username-admin', {id, username, password});
  };
  
  return {
    updatePasswordAdmin, updateUsernameAdmin
  };
};

export default useAdmin;