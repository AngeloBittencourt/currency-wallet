import React from 'react';
import { Route, Switch } from 'react-router';
import './styles/index.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (

    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/TrybeWallet" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
