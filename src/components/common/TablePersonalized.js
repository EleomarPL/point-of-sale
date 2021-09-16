import React from 'react';
import PropTypes from 'prop-types';

const TablePersonalized = ({header, listData, listProperties, setDataSelected, dataSelected}) => {

  const handleDataSelected = (object) => {
    setDataSelected(object);
  };

  return (
    <div className="table-responsive" style={ {maxHeight: '50vh'} }>
      <table className="table table-striped table-hover text-center"
        style={ {backgroundColor: '#D7D7D7'} }
      >
        <thead className="table-dark">
          <tr>
            { header &&
              header.map(value =>
                <th key={ value } >{ value }</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          { listData &&
            listData.map(object =>
              <tr
                key={ object[listProperties[0]] }
                style={ {
                  backgroundColor: dataSelected[listProperties[0]] === object[listProperties[0]] && '#0070ba',
                  color: dataSelected[listProperties[0]] === object[listProperties[0]] && 'white',
                  cursor: 'pointer'
                } }
                onClick={ () => handleDataSelected(object) }
              >
                { listProperties &&
                  listProperties.map(value =>
                    <td key={ object[listProperties[0]] + value }>{ object[value] }</td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

TablePersonalized.propTypes = {
  header: PropTypes.array.isRequired,
  listData: PropTypes.array.isRequired,
  listProperties: PropTypes.array.isRequired,
  dataSelected: PropTypes.object.isRequired,
  setDataSelected: PropTypes.func.isRequired
};

export default TablePersonalized;