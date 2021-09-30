import PropTypes from 'prop-types';

const TablePayDebt = ({ header, listDebts, setListDebts }) => {
  const handleChangeValueRadio = ({debtCode}) => {
    let indexValue = listDebts.findIndex( debt => debt.debtCode === debtCode );
    
    if (indexValue !== -1) {
      setListDebts( listDebts.map((value, index) => {
        if (index === indexValue) {
          return { ...value, box: !value.box };
        }
        return { ...value };
      }));
    }
  };

  return (
    <div className="table-responsive" style={ {maxHeight: '75vh'} }>
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
          { listDebts &&
                  listDebts.map(inputData =>
                    <tr key={ inputData.debtCode }>
                      <td><input type="radio"
                        className="form-check-input"
                        checked={ inputData.box }
                        onChange={ () => {} }
                        onClick={ () => handleChangeValueRadio({debtCode: inputData.debtCode}) }
                      /></td>
                      <td>{ inputData.debtCode }</td>
                      <td>{ inputData.itemCode }</td>
                      <td>{ inputData.amount }</td>
                      <td>{ inputData.price }</td>
                      <td>{ inputData.total }</td>
                    </tr>
                  )
          }
        </tbody>
      </table>
    </div>
  );
};

TablePayDebt.propTypes = {
  header: PropTypes.array.isRequired,
  listDebts: PropTypes.array.isRequired,
  setListDebts: PropTypes.func.isRequired
};

export default TablePayDebt;