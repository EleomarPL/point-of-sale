import { DebounceInput as Input } from 'react-debounce-input';
import PropTypes from 'prop-types';

const DebounceInput = ({value, setValue, placeholder, inputRef}) => {

  const handleChangeInput = (evt) => {
    setValue(evt.target.value);
  };
  
  return (
    <Input
      minLength={ 2 }
      type="text"
      { ...(inputRef && {inputRef: inputRef}) }
      aria-label="Buscar"
      aria-describedby="search"
      className="form-control"
      debounceTimeout={ 500 }
      onChange={ handleChangeInput }
      style={ {backgroundColor: '#f6eded'} }
      value={ value }
      placeholder={ placeholder }
    />
  );
};

DebounceInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default DebounceInput;