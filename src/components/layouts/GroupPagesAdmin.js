import PropTypes from 'prop-types';
import ButtonPersonalized from '../common/ButtonPersonalized';

const GroupPagesAdmin = ({children, listButtons}) => {
  return (
    <div className="w-100 d-flex mt-2">
      <div style={ {width: '15%'} } className="d-flex flex-column align-items-center" >
        { listButtons &&
            listButtons.map(buttonToRenderer =>
              <button
                type="button" disabled={ buttonToRenderer.disabled || false }
                style={ {width: '90%', fontSize: '1rem'} }
                onClick={ buttonToRenderer.onClick }
                className="button-personalized is-button-personalized text-decoration-none mb-2"
                key={ buttonToRenderer.classNameIcon }
              >
                <ButtonPersonalized classNameIcon={ buttonToRenderer.classNameIcon } isColumn={ true }>
                  { buttonToRenderer.text }
                </ButtonPersonalized>
              </button>
            )
        }
      </div>
      <div style={ {width: '85%', maxHeight: '100%', overflow: 'auto'} }>
        { children }
      </div>
    </div>
  );
};

GroupPagesAdmin.propTypes = {
  children: PropTypes.node,
  listButtons: PropTypes.array
};

export default GroupPagesAdmin;