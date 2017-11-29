import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
// import LoginForm from './src/components/LoginForm';
import Router from './src/Router';

class App extends Component {

componentWillMount() {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyBlE5TJxuDiBiGmhGH1eLymxCmAer7d5Rg',
    authDomain: 'manager-bab0a.firebaseapp.com',
    databaseURL: 'https://manager-bab0a.firebaseio.com',
    projectId: 'manager-bab0a',
    storageBucket: 'manager-bab0a.appspot.com',
    messagingSenderId: '607355351109'
  };
  firebase.initializeApp(config);
}

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
