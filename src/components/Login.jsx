import React, { Component } from 'react';
import banner from '../images/wallet-money-removebg-preview.png';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  // onHandleChange = ({ target }) => {
  //   this.setState({
  //     [target.id]: target.value,
  //   });
  // }

  const showAll = () => {
    this.setState({
      showAll: true,
      showBtn: false
    });
  };

  render() {
    return (
      <main>
        <h1>Página de login</h1>
        <section>
          <img src={ banner } alt="Money Banner" width="300px" />
          <form action="get">
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
            <button type="submit" disabled>Entrar</button>
          </form>
        </section>
      </main>
    );
  }
}
