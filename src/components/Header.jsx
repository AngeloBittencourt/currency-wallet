import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../images/money-removebg-preview1.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.total = this.total.bind(this);
  }

  total() {
    const { expenses } = this.props;
    const result = expenses.reduce(
      (acc, curr) => acc + (curr.exchangeRates[curr.currency].ask * curr.value),
      0,
    );
    return parseFloat(result).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <main className="header-page">
        <header>
          <section><img src={ logo } alt="logo-dinheiro" width="80px" /></section>
          <section className="user-info" data-testid="email-field">
            Usuário:
            {' '}
            {email}
          </section>
          <section className="user-money">
            Despesas totais: R$
            {' '}
            <span data-testid="total-field">
              {' '}
              {this.total()}
              {' '}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </section>
        </header>
      </main>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
