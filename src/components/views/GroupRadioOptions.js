import PropTypes from 'prop-types';

const GroupRadioOptions = ({
  textRadio1, textRadio2, className, component1, component2, valueRadio1, setValueRadio1
}) => {

  return (
    <div className="w-100">
      <div className="d-flex flex-wrap justify-content-center">
        <div className="form-check" style={ {marginRight: '1rem'} }>
          <input className="form-check-input" type="radio"
            id="radio1"
            checked={ valueRadio1 }
            onChange={ () => setValueRadio1(!valueRadio1) }
          />
          <label className="form-check-label" htmlFor="radio1">
            { textRadio1 }
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio"
            id="radio2"
            checked={ !valueRadio1 }
            onChange={ () => setValueRadio1(!valueRadio1) }
          />
          <label className="form-check-label" htmlFor="radio2">
            { textRadio2 }
          </label>
        </div>
      </div>
      <div className={ className } >
        { valueRadio1
          ? component1
          : component2
        }
      </div>
    </div>
  );
};

GroupRadioOptions.propTypes = {
  textRadio1: PropTypes.string.isRequired,
  textRadio2: PropTypes.string.isRequired,
  className: PropTypes.string,
  component1: PropTypes.node,
  component2: PropTypes.node,
  valueRadio1: PropTypes.bool,
  setValueRadio1: PropTypes.func
};

export default GroupRadioOptions;