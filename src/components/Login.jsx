import React, { Component } from 'react';
import banner from '../images/wallet-money-removebg-preview.png';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.onHandleChange = this.onHandleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  onHandleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
    this.validateLogin();
  }

  validateLogin() {
    const emailField = document.getElementById('email');
    const passField = document.getElementById('password');
    const button = document.getElementById('buttonLogin');
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const EMAIL_MIN_LENGHT = 6;

    if (passField.value.length >= EMAIL_MIN_LENGHT && re.test(emailField.value)) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

  render() {
    return (
      <main>
        <h1>Página de login</h1>
        <section>
          <img src={ banner } alt="Money Banner" width="300px" />
          <form>
            <label htmlFor="email">
              <input
                placeholder="E-mail"
                type="email"
                name="email"
                id="email"
                onChange={ this.onHandleChange }
                data-testid="email-input"
              />
            </label>
            <label htmlFor="password">
              <input
                placeholder="Senha"
                type="password"
                name="password"
                id="password"
                onChange={ this.onHandleChange }
                data-testid="password-input"
              />
            </label>
            <div id="error-nwl" />
            <button
              id="buttonLogin"
              type="submit"
              preventdefault="true"
              disabled
            >
              Entrar
            </button>
          </form>
        </section>
      </main>
    );
  }
}
