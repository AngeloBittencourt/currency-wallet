import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <ExpenseForm />
        <hr />
        <Table />
      </section>
    );
  }
}

export default Wallet;
