import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {inputShopping} from '../../../data/admin/modalShopping';
import SelectProvider from '../../common/SelectProvider';
import DebounceInput from '../../common/DebounceInput';
import useArticle from '../../../hooks/useArticles';

const BoxInputsShoppingModal = ({setDataProductTemp, setDataNewShopping, dataSelected2, setDataSelected2}) => {
  const [code, setCode] = useState('');
  const [article, setArticle] = useState('');
  const {getArticleById, getArticleForAuxTable} = useArticle();

  const [isProductExist, setIsProductExist] = useState(false);

  useEffect(() => {
    if (code)
      getArticleById({id: code});
  }, [code]);

  useEffect(() => {
    if (article)
      getArticleForAuxTable({value: article});
  }, [article]);

  useEffect(() => {
    window.electron.on('render:get-article-by-id', (err, data) => {
      if (!err) {
        console.log('error get article by id');
        return null;
      }
      if (data)
        setDataProductTemp(data.map(article => {
          return {
            ...article, code: article.id
          };
        }));
    });
    window.electron.on('render:get-article-for-auxtable', (err, data) => {
      if (!err) {
        console.log('error get article for auxtable');
        return null;
      }
      if (data)
        setDataProductTemp(data.map(dataArticle => {
          return {
            ...dataArticle, code: dataArticle.id
          };
        }));
    });

    return () => {
      window.electron.removeAllListeners('render:get-article-by-id');
      window.electron.removeAllListeners('render:get-article-for-auxtable');
    };
  }, []);

  return (
    <div className="w-100">
      <table className="w-100">
        <tbody>
          <tr>
            <td>Codigo</td>
            <td>
              <DebounceInput
                placeholder="Codigo"
                setValue={ setCode }
                value={ code }
              />
            </td>
          </tr>
          <tr>
            <td>Producto</td>
            <td>
              <DebounceInput
                placeholder="Producto"
                setValue={ setArticle }
                value={ article }
              />
            </td>
          </tr>
          { inputShopping &&
            inputShopping.map(data =>
              <tr key={ data.id }>
                <td>{ data.placeholder }</td>
                <td>
                  <input type={ data.type } className="form-control"
                    placeholder={ data.placeholder } aria-label={ data.id.toUpperCase() }
                    aria-describedby={ data.id }
                    disabled={ isProductExist && (data.id === 'purchasePrice' || data.id === 'stock') }
                    style={ {backgroundColor: '#f6eded'} }
                  />
                </td>
              </tr>
            )
          }
          <tr>
            <td>Fecha de Caducidad</td>
            <td>
              <input type="datetime-local" className="form-control"
                aria-label="DateofExpiry"
                aria-describedby="ate-of-expiry"
                style={ {backgroundColor: '#f6eded'} }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex align-items-center justify-content-between">
        <SelectProvider widthSelect="65%" />
      </div>
    </div>
  );
};

BoxInputsShoppingModal.propTypes = {
  setDataProductTemp: PropTypes.func.isRequired,
  setDataNewShopping: PropTypes.func.isRequired,
  dataSelected2: PropTypes.object.isRequired,
  setDataSelected2: PropTypes.func.isRequired
};

export default BoxInputsShoppingModal;