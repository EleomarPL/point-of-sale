const useEmployee = () => {
  const getEmployees = ({value, limit}) => {
    window.electron.send('main:get-employees', {value, limit});
  };
  const insertEmployee = ({name, lastName, motherLastName, age, isAMan, username, password}) => {
    window.electron.send('main:insert-employee', {
      name, lastName, motherLastName, age, isAMan, username, password
    });
  };
  const updateStatusEmployee = ({id, willIsLocked}) => {
    window.electron.send('main:update-status-employee', {id, willIsLocked});
  };
  const updateEmployee = ({id, age, username, password}) => {
    window.electron.send('main:update-employee', {id, age, username, password});
  };
  
  return {
    getEmployees, updateStatusEmployee, insertEmployee, updateEmployee
  };
};

export default useEmployee;