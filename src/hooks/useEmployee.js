const useEmployee = () => {
  const getEmployees = ({value, limit}) => {
    window.electron.send('main:get-employees', {value, limit});
  };
  const updateStatusEmployee = ({id, willIsLocked}) => {
    window.electron.send('main:update-status-employee', {id, willIsLocked});
  };
  
  return {
    getEmployees, updateStatusEmployee
  };
};

export default useEmployee;