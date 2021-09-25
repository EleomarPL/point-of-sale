import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';

const SearcherPersonalized = ({ title, value, setValue, placeholder }) => {
  const handleChangeInput = (evt) => {
    setValue(evt.target.value);
  };

  return (
    <div className="w-50">
      <div className="input-group align-items-center">
        <span style={ {fontSize: '1.2rem', paddingRight: '0.7rem'} }>{ title }:</span>
        <DebounceInput
          minLength={ 2 }
          type="text"
          aria-label="Buscar"
          aria-describedby="search"
          className="form-control"
          debounceTimeout={ 500 }
          onChange={ handleChangeInput }
          value={ value }
          placeholder={ placeholder }
        />
      </div>
    </div>
  );
};

SearcherPersonalized.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearcherPersonalized;