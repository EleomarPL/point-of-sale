import ButtonPersonalized from '../common/ButtonPersonalized';
import useLogin from '../../hooks/useLogin';

const LogoutBox = () => {

  const { logout } = useLogin();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div style={ {minHeight: '10vh', backgroundColor: '#D5E1CC'} }>
      <div className="d-flex justify-content-end align-items-center">
        <button
          type="button"
          className="button-personalized is-button-personalized"
          style={ {borderRadius: '10px'} }
          onClick={ handleLogout }
        >
          <ButtonPersonalized classNameIcon="bi bi-box-arrow-left">
            Cerrar Sesión
          </ButtonPersonalized>
        </button>
      </div>
    </div>
  );
};

export default LogoutBox;