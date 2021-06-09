import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  renderTable() {
    const { expenses } = this.props;

    return (expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {Number(expense.value * expense.exchangeRates[expense.currency].ask)
            .toFixed(2)}
        </td>
        <td>Real</td>
      </tr>
    )));
  }

  render() {
    return (
      <table>
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
        <hr />
        <tbody>
          { this.renderTable() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

export default connect(mapStateToProps)(Table);
