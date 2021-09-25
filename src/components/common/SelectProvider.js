import PropTypes from 'prop-types';

const SelectProvider = ({ widthSelect = '10%'}) => {
  return (
    <>
      <span className="mx-1">Proveedor: </span>
      <select className="form-select mx-1" style={ {width: widthSelect} }>
        <option value="default">Provider</option>
      </select>
    </>
  );
};

SelectProvider.propTypes = {
  widthSelect: PropTypes.string
};

export default SelectProvider;