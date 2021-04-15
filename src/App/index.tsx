import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import MainScreen from './screens/Main';
import OrderScreen from './screens/Order';

const App: () => JSX.Element = () => (
  <Router>
    <Switch>
      <Route path='/order'>
        <OrderScreen />
      </Route>
      <Route path='/'>
        <MainScreen />
      </Route>
    </Switch>
  </Router>
);

export default App;
