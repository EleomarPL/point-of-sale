import React from 'react';
import PropTypes from 'prop-types';

const InputPersonalized = ({
  type, classNameIcon, id, placeholder, ariaLabel, value, setValue, autofocus = false
}) => {
  return (
    <div className="input-group">
      <span className="input-group-text" id={ id }>
        <i className={ classNameIcon } style={ {fontSize: '1.3rem'} } ></i>
      </span>
      <input type={ type } className="form-control"
        placeholder={ placeholder } aria-label={ ariaLabel }
        aria-describedby={ id } value={ value }
        onChange={ (evt) => setValue(evt.target.value) }
        autoFocus={ autofocus }
      />
    </div>
  );
};

InputPersonalized.propTypes = {
  type: PropTypes.string,
  classNameIcon: PropTypes.string,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  autofocus: PropTypes.bool
};

export default InputPersonalized;