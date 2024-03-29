import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import SelectProvider from '../../common/SelectProvider';
import DebounceInput from '../../common/DebounceInput';
import useArticle from '../../../hooks/useArticles';
import { convertDateYYYYMMDD } from '../../../utils/convertDateYMD';

const BoxInputsShoppingModal = ({
  setDataProductTemp, dataSelected2,
  setDataSelected2, codeRef
}) => {
  const [code, setCode] = useState('');
  const [article, setArticle] = useState('');
  const [providerSelect, setProviderSelect] = useState('');
  const [isProductExist, setIsProductExist] = useState(false);

  const nameRef = useRef({});
  const purchasePriceRef = useRef({});
  const salesPriceRef = useRef({});
  const stockRef = useRef({});
  const amountRef = useRef({});
  const dateofExpiryRef = useRef({});

  const {getArticleById, getArticleForAuxTable} = useArticle();

  useEffect(() => {
    if (code) {
      getArticleById({id: code}).then(response => {
        amountRef.current.value = '';
        if (response) {
          setIsProductExist(true);
          
          nameRef.current.value = response.article;
          purchasePriceRef.current.value = response.purchasePrice;
          salesPriceRef.current.value = response.salesPrice;
          stockRef.current.value = response.amount;
  
          setProviderSelect(response.id_provider.toString());
          
          if (response.dateofExpiry) {
            let splitDate = new Date(response.dateofExpiry).toLocaleDateString().split('/');
            dateofExpiryRef.current.value = convertDateYYYYMMDD({day: splitDate[0], month: splitDate[1], year: splitDate[2]});
          } else
            dateofExpiryRef.current.value = '';

          amountRef.current.focus();
          
        } else {
          setIsProductExist(false);
          nameRef.current.value = '';
          purchasePriceRef.current.value = '';
          salesPriceRef.current.value = '';
          stockRef.current.value = '0';
          dateofExpiryRef.current.value = '';
        }
      });
      setDataProductTemp([]);
      setDataSelected2({});
    }
  }, [code]);

  useEffect(() => {
    if (article && !code) {
      getArticleForAuxTable({value: article}).then(response => {
        if (response) setDataProductTemp(response);
      });
      setDataSelected2({});
    }
  }, [article]);
  
  useEffect(() => {
    if (!code)
      if (dataSelected2.id) {
        setIsProductExist(true);
        codeRef.current.value = dataSelected2.id.toString();
        nameRef.current.value = dataSelected2.article;
        purchasePriceRef.current.value = dataSelected2.purchasePrice;
        salesPriceRef.current.value = dataSelected2.salesPrice;
        stockRef.current.value = dataSelected2.amount;
        amountRef.current.value = '';

        amountRef.current.focus();
      } else {
        setIsProductExist(false);
        purchasePriceRef.current.value = '';
        salesPriceRef.current.value = '';
        stockRef.current.value = '0';
        dateofExpiryRef.current.value = '';
      }
  }, [dataSelected2]);
  useEffect(() => {
    setCode(codeRef.current.value);
  }, [codeRef.current.value]);


  return (
    <div className="w-100 row row-cols-lg-1 g-1">
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label">Codigo</label>
        <DebounceInput
          placeholder="Codigo"
          setValue={ setCode }
          inputRef={ codeRef }
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label">Nombre</label>
        <DebounceInput
          placeholder="Nombre"
          setValue={ setArticle }
          inputRef={ nameRef }
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label">Precio compra</label>
        <input
          type="text" ref={ purchasePriceRef }
          className="form-control flex-fill"
          style={ {backgroundColor: '#f6eded'} }
          placeholder="Precio compra"
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label">Precio venta</label>
        <input
          type="text" ref={ salesPriceRef }
          className="form-control flex-fill"
          style={ {backgroundColor: '#f6eded'} }
          disabled={ isProductExist }
          placeholder="Precio venta"
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label">Cantidad</label>
        <input
          type="text" ref={ amountRef }
          className="form-control flex-fill"
          style={ {backgroundColor: '#f6eded'} }
          placeholder="Cantidad"
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label">Existencia</label>
        <input
          type="text" ref={ stockRef }
          className="form-control flex-fill"
          style={ {backgroundColor: '#f6eded'} }
          disabled={ true }
          placeholder="Existencia"
        />
      </div>
      <div className="input-group row row-cols-lg-3 g-1">
        <label className="col-form-label">Fecha de caducidad</label>
        <input type="date" className="form-control"
          aria-label="DateofExpiry"
          aria-describedby="ate-of-expiry"
          style={ {backgroundColor: '#f6eded'} }
          ref={ dateofExpiryRef }
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <SelectProvider widthSelect="58%" keyProvider={ providerSelect } />
      </div>
      <input type="radio" className="visually-hidden"
        value={ isProductExist }
      />
    </div>
  );
};

BoxInputsShoppingModal.propTypes = {
  setDataProductTemp: PropTypes.func.isRequired,
  dataSelected2: PropTypes.object.isRequired,
  setDataSelected2: PropTypes.func.isRequired,
  codeRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default BoxInputsShoppingModal;