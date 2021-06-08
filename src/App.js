import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (

    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/wallet" component={ Wallet } />
    </Switch>
  );
}

export default App;
