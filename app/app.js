import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';

import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';

const syncHistoryWithStore = (store, history) => {
  const { routing } = store.getState();
  if(routing && routing.location) {
    history.replace(routing.location);
  }
};

const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/loggedin" component={LoggedInPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  rootElement
);
