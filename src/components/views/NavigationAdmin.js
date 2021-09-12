import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import ButtonPersonalized from '../common/ButtonPersonalized';

const NavigationAdmin = ({navigation}) => {
  return (
    <nav className="col-md-12 d-flex flex-wrap justify-content-between">
      { navigation &&
        navigation.map(option =>
          <NavLink
            key={ option.classNameIcon } exact
            to={ '/admin' + option.path }
            className="button-personalized is-menu text-black text-decoration-none"
            style={ {width: '19%'} }
            activeClassName="active-admin"
          >
            <ButtonPersonalized
              classNameIcon={ option.classNameIcon }
            >
              { option.text }
            </ButtonPersonalized>
          </NavLink>
        )
      }
    </nav>
  );
};

NavigationAdmin.propTypes = {
  navigation: PropTypes.array.isRequired
};

export default NavigationAdmin;