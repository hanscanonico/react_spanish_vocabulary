import React from 'react';
import './App.css';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './redux';
import { Outlet, Link } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    );
  }

}

export default App;
