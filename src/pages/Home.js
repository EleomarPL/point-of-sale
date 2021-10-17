import { useState } from 'react';

import ButtonPersonalized from '../components/common/ButtonPersonalized';
import InputPersonalized from '../components/common/InputPersonalized';
import SpinnerButtonLoading from '../components/common/SpinnerButtonLoading';
import useLogin from '../hooks/useLogin';

const Home = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {login} = useLogin();

  const handleLogin = () => {
    setIsLoading(true);
    login({userName, password});
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
      <div className="col-md-12 row justify-content-center align-items-center"
        style={ {height: '15vh', borderTop: '1px solid black'} }
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
            event={ handleLogin }
          />
        </div>
        <div className="col-md-auto">
          <button
            type="button"
            className="button-personalized is-button-personalized w-100"
            onClick={ handleLogin }
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
      </div>
    </section>
  );
};

export default Home;