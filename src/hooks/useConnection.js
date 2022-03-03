const useConecction = () => {
  const validateConnectionToDB = () => {
    window.electron.send('main:validate-connection-to-db');
  };

  return {
    validateConnectionToDB
  };
};

export default useConecction;