import Home from '../subpages/user/Home';
import ModalAddArticle from '../components/modals/ModalAddArticle';
import ModalViewsArticles from '../components/modals/ModalViewArticles';

const My = () => {
  return (
    <section>
      <Home />
      <ModalAddArticle />
      <ModalViewsArticles />
    </section>
  );
};

export default My;