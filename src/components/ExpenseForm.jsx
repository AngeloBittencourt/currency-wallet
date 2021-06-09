import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinsFetch from '../services/Api';
import { addExpense, updateCurrencies } from '../actions';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);

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

  onHandleClick() {
    const { expense } = this.props;
    this.fetchCoins();
    expense({ ...this.state });
    this.setState((state) => ({
      id: state.id + 1,
    }));
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

  renderButton() {
    return (<input
      className="buttonLogin"
      type="button"
      value="Adicionar despesa"
      onClick={ this.onHandleClick }
    />);
  }

  render() {
    return (
      <div className="div-form">
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
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.func.isRequired,
  currency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  expense: (expenses) => dispatch(addExpense(expenses)),
  currency: (currencies) => dispatch(updateCurrencies(currencies)),
});

const mapStateToProps = ({ wallet: { currencies } }) => ({ currencies });

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
