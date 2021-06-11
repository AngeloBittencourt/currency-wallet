import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteExpense, editExpense, setExpenses } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  onChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  onClickSave() {
    const { expenses, edit, update, expense } = this.props;
    const newList = {};
    const newExpense = { ...this.state };
    const nl = expenses.map((list) => (list.id === expense.id ? newExpense : list));
    update(nl);
    edit(newList, false);
  }

  deleteOnClick(thisId) {
    const { remover, expenses } = this.props;
    const thisList = expenses.filter((expense) => expense.id !== thisId);
    remover(thisList);
  }

  editOnClick(thisId) {
    const { edit, expenses } = this.props;
    const thisList = expenses.find((expense) => expense.id === thisId);
    edit(thisList, true);

    this.setState({
      id: thisList.id,
      value: thisList.value,
      currency: thisList.currency,
      method: thisList.method,
      tag: thisList.tag,
      description: thisList.description,
      exchangeRates: thisList.exchangeRates,
    });
  }

  renderSaveButton() {
    return (<input
      className="buttonLogin"
      type="button"
      value="Editar despesa"
      onClick={ this.onClickSave }
    />);
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

  renderDropCoins() {
    const { currency } = this.state;
    const { currencies } = this.props;
    if (currencies === '') {
      return <option value="BRL"> BRL </option>;
    }

    return (
      <select
        data-testid="currency-input"
        value={ currency }
        id="currency"
        onChange={ this.onChange }
      >
        {currencies.map((moeda) => (
          <option key={ moeda.code } value={ moeda.code }>
            {moeda.code}
          </option>))}
      </select>);
  }

  renderDropMethods() {
    const { method } = this.state;
    return (
      <select
        data-testid="method-input"
        value={ method }
        id="method"
        onChange={ this.onChange }
      >

        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>);
  }

  renderDropTags() {
    const { tag } = this.state;
    return (
      <select
        data-testid="tag-input"
        value={ tag }
        id="tag"
        onChange={ this.onChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saude">Saúde</option>
      </select>);
  }

  renderEditForm() {
    const { value, description } = this.state;
    return (
      <section className="div-edit">
        <form className="form-edit-expense">
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              value={ value }
              className="vix"
              type="number"
              id="value"
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            {this.renderDropCoins()}
          </label>
          <label htmlFor="method">
            Método de pagamento:
            {this.renderDropMethods()}
          </label>
          <label htmlFor="tag">
            Tag:
            {this.renderDropTags()}
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              value={ description }
              type="text"
              id="description"
              onChange={ this.onChange }
            />
          </label>
          {this.renderSaveButton()}
        </form>
      </section>);
  }

  render() {
    const { isEdit } = this.props;
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
          {isEdit ? this.renderEditForm() : console.log('')}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  isEdit: PropTypes.bool.isRequired,
  remover: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  expense: PropTypes.arrayOf(),
}.isRequired;

const mapStateToProps = ({ wallet: { expenses, currencies, isEdit, expense } }) => ({
  expenses, currencies, isEdit, expense,
});

const mapDispatchToProps = (dispatch) => ({
  remover: (expense) => dispatch(deleteExpense(expense)),
  edit: (expense, isEdit) => dispatch(editExpense(expense, isEdit)),
  update: (expenses) => dispatch(setExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
