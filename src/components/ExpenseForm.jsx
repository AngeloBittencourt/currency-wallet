import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinsFetch from '../services/Api';
import { addExpense } from '../actions';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);

    this.state = {
      exchangeRates: '',
      isFetched: false,
      id: 0,
      valor: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  async componentDidMount() {
    this.fetchCoins();
  }

  onHandleChange({ target }) {
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
    const fetched = await coinsFetch();
    delete fetched.USDT;
    this.setState({
      exchangeRates: Object.values(fetched),
      isFetched: true });
    return fetched;
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
    const { exchangeRates, isFetched } = this.state;
    return (
      <div className="div-form">
        <form className="form-expense">
          <label htmlFor="valor">
            Valor:
            <input type="number" id="valor" onChange={ this.onHandleChange } />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select name="moeda" id="currency" onChange={ this.onHandleChange }>
              {isFetched
                ? exchangeRates.map((moeda) => (
                  <option key={ moeda.code } value={ moeda.code }>
                    {moeda.code}
                  </option>
                )) : <option value="BRL"> BRL </option>}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento:
            <select name="metodo" id="method" onChange={ this.onHandleChange }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select name="tag" id="tag" onChange={ this.onHandleChange }>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input type="text" id="description" onChange={ this.onHandleChange } />
          </label>
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  expense: (expenses) => dispatch(addExpense(expenses)),
});

export default connect(null, mapDispatchToProps)(ExpenseForm);
