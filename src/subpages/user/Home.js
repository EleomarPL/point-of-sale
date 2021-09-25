import ButtonsMy from '../../components/views/ButtonsMy';
import LogoutBox from '../../components/views/LogoutBox';

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

  return (
    <section className="col-md-12" style={ {backgroundColor: '#BED7AA'} }>
      <div style={ {minHeight: '5vh', maxHeight: '5vh', backgroundColor: '#cbd8c4'} }
        className="d-flex align-items-center"
      >
        <i className="bi bi-person-badge-fill" style={ {fontSize: '1.8rem', marginRight: '1rem'} }></i>
        <span style={ {fontSize: '1.5rem'} } >Caja 1</span>
      </div>
      <div style={ {minHeight: '15vh', maxHeight: '15vh', backgroundColor: '#d5e1cc'} }
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
      <LogoutBox />
    </section>
  );
};

export default Home;