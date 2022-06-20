import { useEffect, useRef, useState } from 'react';

import SpinnerButtonLoading from '../components/common/SpinnerButtonLoading';
import useValidationConnnection from '../hooks/validations/useValidationConnnection';

const Connection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { validateCreationLogForMariadb } = useValidationConnnection();

  const inputHostRef = useRef({});
  const inputPortRef = useRef({});
  const inputUserRef = useRef({});
  const inputDatabsaseRef = useRef({});

  useEffect(() => {
    inputHostRef.current.value = 'localhost';
    inputUserRef.current.focus();

    inputPortRef.current.value = '3306';
    inputDatabsaseRef.current.value = 'point_of_sale';
  }, []);

  const handleVerifyConnection = (evt) => {
    evt.preventDefault();
    if (validateCreationLogForMariadb({event: evt})) {
      setIsLoading(true);
    }
  };

  return (
    <section className="col-md-12 min-vh-100" style={ {backgroundColor: '#BED7AA'} }>
      <h1 className="text-center">Conexión a la base de datos</h1>
      <form className="w-50 m-auto mt-4" onSubmit={ handleVerifyConnection }>
        <div className="input-group row row-cols-lg-4 g-1 mb-2">
          <label className="col-form-label" htmlFor="host">Host</label>
          <input
            type="text" id="host"
            className="form-control flex-fill"
            style={ {backgroundColor: '#f6eded'} }
            ref={ inputHostRef }
          />
        </div>
        <div className="input-group row row-cols-lg-4 g-1 mb-2">
          <label className="col-form-label" htmlFor="port">Puerto</label>
          <input
            type="text" id="port"
            className="form-control flex-fill"
            style={ {backgroundColor: '#f6eded'} }
            ref={ inputPortRef }
          />
        </div>
        <div className="input-group row row-cols-lg-4 g-1 mb-2">
          <label className="col-form-label" htmlFor="user">Usuario</label>
          <input
            type="text" id="user"
            className="form-control flex-fill"
            style={ {backgroundColor: '#f6eded'} }
            ref={ inputUserRef }
          />
        </div>
        <div className="input-group row row-cols-lg-4 g-1 mb-2">
          <label className="col-form-label" htmlFor="password">Contraseña</label>
          <input
            type="text" id="password"
            className="form-control flex-fill"
            style={ {backgroundColor: '#f6eded'} }
          />
        </div>
        <div className="input-group row row-cols-lg-4 g-1 mb-2">
          <label className="col-form-label" htmlFor="database">Base de datos</label>
          <input
            type="text" id="database"
            className="form-control flex-fill"
            style={ {backgroundColor: '#f6eded'} }
            ref={ inputDatabsaseRef }
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary"
            disabled={ isLoading }
          >
            { isLoading && <SpinnerButtonLoading /> }
            Conectar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Connection;