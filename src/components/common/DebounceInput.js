import { debounce } from 'lodash';
import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

// Reusable input to add a debouncer

const DebounceInput = ({setValue, placeholder, inputRef}) => {

  const manejarCambios = (event) => {
    setValue(event.target.value);
  };
  const handleDebounceChanges = useMemo(
    () => debounce(manejarCambios, 1000)
    , []
  );
  useEffect(() => {
    return () => {
      handleDebounceChanges.cancel();
    };
  }, []);
  
  return (
    <input
      minLength={ 2 }
      type="text"
      ref={ inputRef }
      aria-label="Buscar"
      aria-describedby="search"
      className="form-control flex-fill"
      onChange={ handleDebounceChanges } autoFocus
      style={ {backgroundColor: '#f6eded'} }
      placeholder={ placeholder }
    />
  );
};

DebounceInput.propTypes = {
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default DebounceInput;