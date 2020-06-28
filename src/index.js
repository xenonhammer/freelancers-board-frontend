import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css';
import App from './App/App';
import './media.css'
import allReducers from './redux/allReducers/allReducers';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Authenticated from './components/Auth/Authenticated';

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store = {store}>
        <Switch>
            <Route path="/home" exact>
              <App />
            </Route>
            <Route path="/" exact>
              <Authenticated />
            </Route>
        </Switch>  
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
