import { useNavigate } from 'react-router-dom';

const useConnection = () => {
  const navigate = useNavigate();

  const validateConnectionToDB = async() => {
    const connection = await window.electron.invoke('main:validate-connection-to-db');
    if (!connection) navigate('/create-connection-to-db');
  };

  return {
    validateConnectionToDB
  };
};

export default useConnection;