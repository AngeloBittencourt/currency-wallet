import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  render() {
    return (
      <div className="div-form">
        <form className="form-expense">
          <label htmlFor="valor">
            Valor:
            {' '}
            <input type="number" name="valor" id="valor" style={ { width: '80px' } } />
          </label>
          <label htmlFor="moeda">
            Moeda:
            {' '}
            <select name="moeda" id="moeda">
              <option value="BRL">BRL</option>
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento:
            {' '}
            <select name="metodo" id="metodo">
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            {' '}
            <select name="tag" id="tag">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <label htmlFor="descricao">
            Descrição:
            {' '}
            <input type="text" name="descricao" id="descricao" />
          </label>
          <input className="buttonLogin" type="button" value="Adicionar despesa" />
        </form>
      </div>
    );
  }
}
