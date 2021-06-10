import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteExpense, editExpense } from '../actions';

class Table extends Component {
  deleteOnClick(thisId) {
    const { remover, expenses } = this.props;
    const thisList = expenses.filter((expense) => expense.id !== thisId);
    remover(thisList);
  }

  editOnClick(thisId) {
    const { edit, expenses } = this.props;
    const thisList = expenses.find((expense) => expense.id === thisId);
    edit(thisList, true);
  }

  renderTable() {
    const { expenses } = this.props;

    return (expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
        <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {Number(expense.value * expense.exchangeRates[expense.currency].ask)
            .toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            className="edit-btn"
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.editOnClick(expense.id) }
          >
            Edit
          </button>
          <button
            className="delete-btn"
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteOnClick(expense.id) }
          >
            Remove
          </button>
        </td>
      </tr>
    )));
  }

  render() {
    return (
      <table border="1" rules="ROWS">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { this.renderTable() }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  remover: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

const mapDispatchToProps = (dispatch) => ({
  remover: (expense) => dispatch(deleteExpense(expense)),
  edit: (expense, isEdit) => dispatch(editExpense(expense, isEdit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
