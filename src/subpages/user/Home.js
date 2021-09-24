import React from 'react';

import ButtonPersonalized from '../../components/common/ButtonPersonalized';
import ButtonsMy from '../../components/views/ButtonsMy';

const Home = () => {

  const buttonsMy = [
    {
      text: 'Buscar Articulo',
      classNameIcon: 'bi bi-search',
      onClick: () => {
        console.log('open modal search article');
      }
    },
    {
      text: 'Verificar Precios',
      classNameIcon: 'bi bi-file-code-fill',
      onClick: () => {
        console.log('open modal verify prices');
      }
    },
    {
      text: 'Eliminar Producto',
      classNameIcon: 'bi bi-trash-fill',
      onClick: () => {
        console.log('delete article');
      }
    },
    {
      text: 'Cancelar Venta',
      classNameIcon: 'bi bi-x-circle-fill',
      onClick: () => {
        console.log('cancel sale');
      }
    }
  ];
  
  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <section className="col-md-12" style={ {backgroundColor: '#BED7AA'} }>
      <div style={ {minHeight: '7vh', maxHeight: '7vh', backgroundColor: '#cbd8c4'} }
        className="d-flex align-items-center"
      >
        <i className="bi bi-person-badge-fill" style={ {fontSize: '2rem', marginRight: '1rem'} }></i>
        <span style={ {fontSize: '1.5rem'} } >Caja 1</span>
      </div>
      <div style={ {minHeight: '13vh', maxHeight: '13vh', backgroundColor: '#d5e1cc'} }
        className="d-flex flex-wrap align-items-center"
      >
        <ButtonsMy navigation={ buttonsMy } />
      </div>
      <div className="row col-md-12 px-0 mx-0" style={ {minHeight: '70vh', maxHeight: '70vh'} }>
        <div className="col-md-9">

        </div>
        <div className="col-md-3" style={ {backgroundColor: '#d2ecc6'} }>
          
        </div>
      </div>
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
    </section>
  );
};

export default Home;