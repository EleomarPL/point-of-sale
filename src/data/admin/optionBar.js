import { openmodalShowAllPurchases } from '../../components/modals/ModalShowAllPurchases';
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
      openmodalShowAllPurchases();
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