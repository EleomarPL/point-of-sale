import { optionBarAdmin } from '../../data/admin/optionBar';

const OptionBarAdmin = () => {
  return (
    <div className="d-flex justify-content-start"
      style={ {fontSize: '0.9rem'} }
    >
      { optionBarAdmin &&
        Object.keys(optionBarAdmin).map((key, index) =>
          <div className="dropdown"
            key={ key } style={ {marginRight: '0.5rem'} }
          >
            <button className="dropdown-toggle option-bar-admin" type="button"
              id={ `dropdownOptionBar${index}` } data-bs-toggle="dropdown"
              aria-expanded="false"
              style={ {border: 'none', backgroundColor: 'transparent'} }
            >
              { key }
            </button>
            <ul className="dropdown-menu" aria-labelledby={ `dropdownOptionBar${index}` }
              style={ {backgroundColor: '#EBF7E2'} }
            >
              { optionBarAdmin[key] &&
                Object.keys(optionBarAdmin[key]).map(keyToKey =>
                  <li key={ keyToKey }>
                    <button className="dropdown-item" type="button"
                      onClick={ optionBarAdmin[key][keyToKey] }
                    >
                      { keyToKey }
                    </button>
                  </li>
                )
              }
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default OptionBarAdmin;