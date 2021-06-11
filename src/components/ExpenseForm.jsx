import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinsFetch from '../services/Api';
import { addExpense, editExpense, updateCurrencies } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);

    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: '',
    };
  }

  async componentDidMount() {
    await this.fetchCoins();
  }

  onChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  onClickAdd() {
    const { expense } = this.props;
    this.fetchCoins();
    expense({ ...this.state });
    this.setState((state) => ({
      id: state.id + 1,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
    const form = document.getElementsByClassName('form-expense');

    (form)[0].reset();
  }

  onClickEdit() {
    const { edit } = this.props;
    const newList = {};
    edit(newList, false);

    const form = document.getElementsByClassName('form-expense');

    (form)[0].reset();
  }

  async fetchCoins() {
    const { currency } = this.props;
    const fetched = await coinsFetch();
    delete fetched.USDT;
    currency(Object.values(fetched));
    this.setState({ exchangeRates: fetched });
  }

  renderDrop() {
    const { currencies } = this.props;
    if (currencies === '') {
      console.log(currencies);
      return <option value="BRL"> BRL </option>;
    }

    return currencies.map((moeda) => (
      <option key={ moeda.code } value={ moeda.code }>
        {moeda.code}
      </option>));
  }

  renderAddButton() {
    return (<input
      className="buttonLogin"
      type="button"
      value="Adicionar despesa"
      onClick={ this.onClickAdd }
    />);
  }

  renderSaveButton() {
    return (<input
      className="buttonLogin"
      type="button"
      value="Editar despesa"
      onClick={ this.onClickEdit }
    />);
  }

  renderCleanForm() {
    return (
      <section className="div-form">
        <form className="form-expense">
          <label htmlFor="value">
            Valor:
            <input className="vix" type="number" id="value" onChange={ this.onChange } />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select name="moeda" id="currency" onChange={ this.onChange }>
              {this.renderDrop()}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select name="método de pagamento" id="method" onChange={ this.onChange }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select name="tag" id="tag" onChange={ this.onChange }>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input type="text" id="description" onChange={ this.onChange } />
          </label>
          {this.renderAddButton()}
        </form>
      </section>);
  }

  renderEditForm() {
    return (
      <section className="div-edit">
        <form className="form-expense">
          <label htmlFor="value">
            Valor:
            <input className="vix" type="number" id="value" onChange={ this.onChange } />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select name="moeda" id="currency" onChange={ this.onChange }>
              {this.renderDrop()}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select name="método de pagamento" id="method" onChange={ this.onChange }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select name="tag" id="tag" onChange={ this.onChange }>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input type="text" id="description" onChange={ this.onChange } />
          </label>
          {this.renderSaveButton()}
        </form>
      </section>);
  }

  render() {
    const { isEdit } = this.props;
    return (
      <div>
        {isEdit ? this.renderEditForm() : this.renderCleanForm()}
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.func.isRequired,
  currency: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  expense: (expenses) => dispatch(addExpense(expenses)),
  currency: (currencies) => dispatch(updateCurrencies(currencies)),
  edit: (expense, isEdit) => dispatch(editExpense(expense, isEdit)),
});

const mapStateToProps = ({ wallet: { currencies, expense, isEdit } }) => (
  { currencies, expense, isEdit }
);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
