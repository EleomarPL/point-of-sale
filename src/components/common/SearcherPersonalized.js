import DebounceInput from './DebounceInput';
import PropTypes from 'prop-types';

// Custom search engine with representative icon

const SearcherPersonalized = ({ title, setValue, placeholder }) => {
  return (
    <div className="w-50">
      <div className="input-group align-items-center">
        <span style={ {fontSize: '1.2rem', paddingRight: '0.7rem'} }>{ title }:</span>
        <DebounceInput
          setValue={ setValue }
          placeholder={ placeholder }
        />
      </div>
    </div>
  );
};

SearcherPersonalized.propTypes = {
  title: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearcherPersonalized;