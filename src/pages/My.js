import Home from '../subpages/user/Home';
import ModalAddArticle from '../components/modals/ModalAddArticle';
import ModalViewsArticles from '../components/modals/ModalViewArticles';
import ModalDebts from '../components/modals/ModalDebts';
import { HashRouter } from 'react-router-dom';

const My = () => {
  return (
    <section>
      <Home />
      <ModalAddArticle />
      <ModalViewsArticles />
      <HashRouter>
        <ModalDebts />
      </HashRouter>
    </section>
  );
};

export default My;