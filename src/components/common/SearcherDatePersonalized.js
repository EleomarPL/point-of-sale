import React from 'react';

import ButtonSearch from '../buttons/ButtonSearch';

const SearcherDatePersonalized = () => {

  return (
    <div className="d-flex flex-wrap  justify-content-center w-100">
      <div style={ {width: '30%'} } className="d-flex align-items-center">
        <label style={ {marginRight: '0.5rem'} } htmlFor="start">De:</label>
        <div className="input-group">
          <input type="datetime-local" className="form-control"
            aria-label="TimeStart" aria-describedby="time-start"
            id="start"
          />
        </div>
      </div>
      <div style={ {width: '30%', marginLeft: '2rem'} } className="d-flex align-items-center">
        <label style={ {marginRight: '0.5rem'} } htmlFor="end">A:</label>
        <div className="input-group">
          <input type="datetime-local" className="form-control"
            aria-label="TimeEnd" aria-describedby="time-end"
            id="end"
          />
        </div>
      </div>
      <ButtonSearch onClick={ () => console.log('search') } />
    </div>
  );
};

export default SearcherDatePersonalized;