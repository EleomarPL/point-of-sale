import { openmodalUpdatePasswordAdmin } from '../../components/modals/ModalUpdatePasswordAdmin';
import { openmodalUpdateUsernameAdmin } from '../../components/modals/ModalUpdateUsernameAdmin';

export const optionBarAdmin = {
  'Modificar Administrador': {
    'Modificar Usuario': () => {
      openmodalUpdateUsernameAdmin();
    },
    'Modificar Contraseña': () => {
      openmodalUpdatePasswordAdmin();
    }
  },
  'Mostrar Entidades Completas': {
    'Cargar Compras': () => {
      console.log('show all purchases');
    },
    'Cargar Productos': () => {
      console.log('show all articles');
    },
    'Cargar Ventas': () => {
      console.log('show all sales');
    }
  },
  'Descargar Reportes': {
    'Descargar Reportes Ventas': () => {
      console.log('download sales report');
    }
  }
};