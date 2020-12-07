import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import Profile from './CustomerProfile/Profile';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bulma/css/bulma.css';
import { Provider } from "react-redux";
import store from "./js/store/index";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><BrowserRouter>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
    <App />
    </ApolloHooksProvider>
    </ApolloProvider>
    </BrowserRouter></Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
