import React from 'react';
import PropTypes from 'prop-types';

const ButtonSearch = ({ onClick, isTypeSubmit = false }) => {
  return (
    <button
      type={ isTypeSubmit ? 'submit' : 'button' }
      className="btn btn-secondary"
      style={ {marginLeft: '1rem'} }
      onClick={ onClick }
    >
      <i className="bi bi-search px-3 py-2"></i>
    </button>
  );
};

ButtonSearch.propTypes = {
  onClick: PropTypes.func.isRequired,
  isTypeSubmit: PropTypes.bool
};

export default ButtonSearch;