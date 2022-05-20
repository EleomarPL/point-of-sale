import { useEffect, useState } from 'react';

import ButtonPersonalized from '../components/common/ButtonPersonalized';
import InputPersonalized from '../components/common/InputPersonalized';
import SpinnerButtonLoading from '../components/common/SpinnerButtonLoading';
import { notifyError, notifyInfo, notifyWarning } from '../consts/notifications';
import useLogin from '../hooks/useLogin';
import useAdmin from '../hooks/useAdmin';
import useValidationLogin from '../hooks/validations/useValidationLogin';
import ModalCreateAdmin, { openmodalCreateAdmin } from '../components/modals/ModalCreateAdmin';

const Home = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { validateLogin } = useValidationLogin();
  const {login, setNewUserData} = useLogin();
  const {isThereAnAdmin} = useAdmin();

  useEffect(() => {
    isThereAnAdmin();
    window.electron.on('render:is-there-an-admin', (err, data) => {
      if (!err) {
        console.log('err');
        return null;
      }
      if (data === null) {
        notifyError('Error en la base de datos');
      } else if (!data) {
        notifyInfo('Cree su perfil de administrador');
        openmodalCreateAdmin();
      } else {
        setIsLoading(false);
      }
    });
    window.electron.on('render:login', (err, data) => {
      if (!err) {
        console.log('err');
        return null;
      }
      setIsLoading(false);
      if (data) {
        if (data.statusUser === 'unlocked') {
          setNewUserData({
            ...data,
            type: data.type === 'employee' ? 1 : 0
          });
        } else {
          notifyWarning('Usuario bloqueado');
        }
      } else {
        notifyInfo('Usuario y/o contraseña invalidos');
      }
    });

    return () => {
      window.electron.removeAllListeners('render:login');
      window.electron.removeAllListeners('render:is-there-an-admin');
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLogin({event: e})) {
      setIsLoading(true);
      login({userName, password});
    }
  };

  return (
    <section className="container-fuild" style={ {backgroundColor: 'var(--principal)'} }>
      <div style={ {height: '15vh', backgroundColor: 'var(--header-1)'} }
        className="d-flex justify-content-center align-items-center"
      >
        <h1>Abarrotes { '"El Paso"' }</h1>
      </div>
      <div className="text-center" style={ {height: '70vh', overflow: 'hidden'} }>
        <img src={ require('../img/presentation-img.png').default }
          alt="Presentación"
          style={ {height: '100%', objectFit: 'cover'} }
        />
      </div>
      <form className="col-md-12 row justify-content-center align-items-center"
        style={ {height: '15vh', borderTop: '1px solid black'} }
        onSubmit={ handleLogin }
      >
        <div className="col-md-3">
          <InputPersonalized
            ariaLabel="UserName" id="username"
            type="text" placeholder="Usuario"
            classNameIcon="bi bi-people-fill"
            value={ userName } setValue={ setUserName }
            autofocus={ true }
          />
        </div>
        <div className="col-md-3">
          <InputPersonalized
            ariaLabel="Password" id="password"
            type="password" placeholder="Contraseña"
            classNameIcon="bi bi-lock-fill"
            value={ password } setValue={ setPassword }
          />
        </div>
        <div className="col-md-auto">
          <button
            type="submit"
            className="button-personalized is-button-personalized w-100"
            style={ {borderRadius: '10px'} }
            disabled={ isLoading }
          >
            <ButtonPersonalized classNameIcon="bi bi-box-arrow-right">
              { isLoading &&
                <SpinnerButtonLoading />
              }
              Iniciar Sesión
            </ButtonPersonalized>
          </button>
        </div>
      </form>
      <ModalCreateAdmin />
    </section>
  );
};

export default Home;