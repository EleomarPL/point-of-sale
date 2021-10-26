const useEmployee = () => {
  const getEmployees = ({value, limit}) => {
    window.electron.send('main:get-employees', {value, limit});
  };
  
  return {
    getEmployees
  };
};

export default useEmployee;