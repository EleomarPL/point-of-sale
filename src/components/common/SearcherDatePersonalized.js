import PropTypes from 'prop-types';

import ButtonSearch from '../buttons/ButtonSearch';

const SearcherDatePersonalized = ({children}) => {

  return (
    <form className="w-100">
      <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
        <div style={ {width: '25%'} } className="d-flex align-items-center">
          <label style={ {marginRight: '0.5rem'} } htmlFor="start">De:</label>
          <div className="input-group">
            <input type="datetime-local" className="form-control"
              aria-label="TimeStart" aria-describedby="time-start"
              id="start"
            />
          </div>
        </div>
        <div style={ {width: '25%', marginLeft: '2rem'} } className="d-flex align-items-center">
          <label style={ {marginRight: '0.5rem'} } htmlFor="end">A:</label>
          <div className="input-group">
            <input type="datetime-local" className="form-control"
              aria-label="TimeEnd" aria-describedby="time-end"
              id="end"
            />
          </div>
        </div>
        { children }
        <ButtonSearch isTypeSubmit={ true } onClick={ () => console.log('search') } />
      </div>
    </form>
  );
};

SearcherDatePersonalized.propTypes = {
  children: PropTypes.node
};

export default SearcherDatePersonalized;