import { lazy, Suspense } from 'react';

import SpinnerLoadingPage from '../components/common/SpinnerLoadingPage';
import Home from '../subpages/user/Home';
import { SalesProvider } from '../contexts/Sales';
import ModalDebts from '../components/modals/ModalDebts';

const ModalAddArticle = lazy(() => import('../components/modals/ModalAddArticle'));
const ModalViewsArticles = lazy(() => import('../components/modals/ModalViewArticles'));

const My = () => {

  /*
    Use of a context (SalesContext) to manipulate the information of a possible sale
  */

  return (
    <SalesProvider>
      <section>
        <Home />
        { /*
          Modal injections with code splitting
        */ }
        <Suspense fallback={ <SpinnerLoadingPage /> }>
          <ModalAddArticle />
          <ModalViewsArticles />
        </Suspense>
        <ModalDebts />
      </section>
    </SalesProvider>
  );
};

export default My;