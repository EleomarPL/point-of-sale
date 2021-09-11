import React from 'react';
import PropTypes from 'prop-types';

const ButtonPersonalized = ({ children, classNameIcon }) => {
  return (
    <span
      className="fw-bold d-flex flex-wrap justify-content-center align-items-center"
    >
      <i className={ classNameIcon }></i>
      { children }
    </span>
  );
};

ButtonPersonalized.propTypes = {
  classNameIcon: PropTypes.string,
  children: PropTypes.node
};

export default ButtonPersonalized;