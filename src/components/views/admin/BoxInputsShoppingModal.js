import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {inputShopping} from '../../../data/admin/modalShopping';
import SelectProvider from '../../common/SelectProvider';
import DebounceInput from '../../common/DebounceInput';
import useArticle from '../../../hooks/useArticles';
import {convertDateYYYYMMDD} from '../../../utils/convertDateYMD';

const BoxInputsShoppingModal = ({setDataProductTemp, setDataNewShopping, dataSelected2, setDataSelected2}) => {
  const [code, setCode] = useState('');
  const [article, setArticle] = useState('');
  const [dataArticle, setDataArticle] = useState({
    purchasePrice: '', salesPrice: '', stock: '', amount: ''
  });
  const [providerSelect, setProviderSelect] = useState('');
  const [dateofExpiry, setDateofExpiry] = useState('');
  const {getArticleById, getArticleForAuxTable} = useArticle();

  const [isProductExist, setIsProductExist] = useState(false);

  useEffect(() => {
    if (code) {
      getArticleById({id: code});
      setDataProductTemp([]);
      setDataSelected2({});
    }
  }, [code]);

  useEffect(() => {
    if (article && !code) {
      getArticleForAuxTable({value: article});
      setDataSelected2({});
    }
  }, [article]);

  useEffect(() => {
    window.electron.on('render:get-article-by-id', (err, data) => {
      if (!err) {
        console.log('error get article by id');
        return null;
      }
      if (data[0] !== undefined) {
        setIsProductExist(true);
        setDataArticle({
          purchasePrice: data[0].purchasePrice, salesPrice: data[0].salesPrice,
          stock: data[0].amount, amount: ''
        });
        setArticle(data[0].article);
        setProviderSelect(data[0].id_provider.toString());
        
        if (data[0].dateofExpiry) {
          let splitDate = new Date(data[0].dateofExpiry).toLocaleDateString().split('/');
          setDateofExpiry(convertDateYYYYMMDD({day: splitDate[0], month: splitDate[1], year: splitDate[2]}));
        } else
          setDateofExpiry('');
        
      } else {
        setIsProductExist(false);
        setDataArticle({
          purchasePrice: '', salesPrice: '',
          stock: '', amount: ''
        });
        setArticle('');
      }
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
  useEffect(() => {
    if (dataSelected2.id) {
      setIsProductExist(true);
      setDataArticle({
        purchasePrice: dataSelected2.purchasePrice, salesPrice: dataSelected2.salesPrice,
        stock: dataSelected2.amount, amount: ''
      });
      setArticle(dataSelected2.article);
      setCode(dataSelected2.id.toString());
    } else {
      setIsProductExist(false);
      setDataArticle({
        purchasePrice: '', salesPrice: '',
        stock: '', amount: ''
      });
    }
  }, [dataSelected2]);

  const setNewValue = ({property, value}) => {
    setDataArticle({
      ...dataArticle,
      [property]: value
    });
  };

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
                    value={ dataArticle[data.id] }
                    onChange={ (evt) => setNewValue({property: data.id, value: evt.target.value}) }
                  />
                </td>
              </tr>
            )
          }
          <tr>
            <td>Fecha de Caducidad</td>
            <td>
              <input type="date" className="form-control"
                aria-label="DateofExpiry"
                aria-describedby="ate-of-expiry"
                style={ {backgroundColor: '#f6eded'} }
                value={ dateofExpiry }
                onChange={ (evt) => {
                  console.log(evt.target.value);
                  setDateofExpiry(evt.target.value);
                } }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex align-items-center justify-content-between">
        <SelectProvider widthSelect="58%" keyProvider={ providerSelect } />
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