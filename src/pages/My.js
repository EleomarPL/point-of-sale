import { HashRouter } from 'react-router-dom';
import {lazy, Suspense} from 'react';

import SpinnerLoadingPage from '../components/common/SpinnerLoadingPage';
import Home from '../subpages/user/Home';
import { SalesProvider } from '../contexts/Sales';
import ModalDebts from '../components/modals/ModalDebts';

const ModalAddArticle = lazy(() => import('../components/modals/ModalAddArticle'));
const ModalViewsArticles = lazy(() => import('../components/modals/ModalViewArticles'));

const My = () => {
  return (
    <SalesProvider>
      <section>
        <Home />
        <Suspense fallback={ <SpinnerLoadingPage /> }>
          <ModalAddArticle />
          <ModalViewsArticles />
        </Suspense>
        <HashRouter>
          <ModalDebts />
        </HashRouter>
      </section>
    </SalesProvider>
  );
};

export default My;