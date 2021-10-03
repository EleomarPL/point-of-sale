import { HashRouter } from 'react-router-dom';
import {lazy, Suspense} from 'react';

import SpinnerLoadingPage from '../components/common/SpinnerLoadingPage';
import Home from '../subpages/user/Home';
import { SalesProvider } from '../contexts/Sales';

const ModalAddArticle = lazy(() => import('../components/modals/ModalAddArticle'));
const ModalViewsArticles = lazy(() => import('../components/modals/ModalViewArticles'));
const ModalDebts = lazy(() => import('../components/modals/ModalViewArticles'));

const My = () => {
  return (
    <SalesProvider>
      <section>
        <Home />
        <Suspense fallback={ <SpinnerLoadingPage /> }>
          <ModalAddArticle />
          <ModalViewsArticles />
          <HashRouter>
            <ModalDebts />
          </HashRouter>
        </Suspense>
      </section>
    </SalesProvider>
  );
};

export default My;