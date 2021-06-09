import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <main className="header-page">
        <header>
          <section className="user-info" data-testid="email-field">
            Usuário:
            {' '}
            {email}
          </section>
          <section className="user-money">
            Despesas totais: R$
            {' '}
            <span data-testid="total-field"> 0 </span>
            <span data-testid="header-currency-field">BRL</span>
          </section>
        </header>
      </main>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

export default connect(mapStateToProps)(Header);
