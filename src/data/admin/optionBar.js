import { openmodalShowAllSales } from '../../components/modals/ModalShowAllSales';
import { openmodalShowAllArticles } from '../../components/modals/ModalShowAllArticles';
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
      openmodalShowAllArticles();
    },
    'Cargar Ventas': () => {
      openmodalShowAllSales();
    }
  },
  'Descargar Reportes': {
    'Descargar Reportes Ventas': () => {
      console.log('download sales report');
    }
  }
};