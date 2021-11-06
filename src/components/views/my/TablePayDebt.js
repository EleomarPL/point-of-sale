import PropTypes from 'prop-types';

const TablePayDebt = ({ header, listDebts, setListDebts }) => {
  const handleChangeValueRadio = ({debtId}) => {
    let indexValue = listDebts.findIndex( debt => debt.debtId === debtId );
    
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
                    <tr key={ inputData.debtId }>
                      <td><input type="radio"
                        className="form-check-input"
                        checked={ inputData.box }
                        onChange={ () => {} }
                        onClick={ () => handleChangeValueRadio({debtId: inputData.debtId}) }
                      /></td>
                      <td>{ inputData.debtId }</td>
                      <td>{ inputData.articleId }</td>
                      <td>{ inputData.article }</td>
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