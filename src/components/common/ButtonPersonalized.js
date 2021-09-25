import PropTypes from 'prop-types';

const ButtonPersonalized = ({ children, classNameIcon, isColumn = false }) => {
  return (
    <span
      className={ `fw-bold d-flex ${isColumn && 'flex-column'} flex-wrap justify-content-center align-items-center` }
    >
      <i className={ classNameIcon }></i>
      { children }
    </span>
  );
};

ButtonPersonalized.propTypes = {
  classNameIcon: PropTypes.string,
  children: PropTypes.node,
  isColumn: PropTypes.bool
};

export default ButtonPersonalized;