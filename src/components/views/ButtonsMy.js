import React from 'react';
import PropTypes from 'prop-types';

import ButtonPersonalized from '../common/ButtonPersonalized';

const ButtonsMy = ({navigation}) => {
  return (
    <nav className="col-md-12 d-flex flex-wrap justify-content-evenly">
      { navigation &&
        navigation.map( option =>
          <button
            type="button"
            key={ option.classNameIcon }
            className="button-personalized is-menu text-black text-decoration-none py-1"
            style={ {width: '19%', fontSize: '1rem'} }
            onClick={ option.onClick }
          >
            <ButtonPersonalized
              isColumn={ true }
              classNameIcon={ option.classNameIcon }
            >
              { option.text }
            </ButtonPersonalized>
          </button>
        )
      }
    </nav>
  );
};

ButtonsMy.propTypes = {
  navigation: PropTypes.array.isRequired
};

export default ButtonsMy;