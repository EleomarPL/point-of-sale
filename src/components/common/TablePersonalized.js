import React from 'react';
import PropTypes from 'prop-types';

const TablePersonalized = ({header, listData, listProperties}) => {
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
  header: PropTypes.array,
  listData: PropTypes.array,
  listProperties: PropTypes.array
};

export default TablePersonalized;