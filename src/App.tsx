import React from 'react';
import './App.css';
// @ts-ignore 
import Header from './features/Category/Header.tsx';
import { Provider } from 'react-redux';
// @ts-ignore 
import { store } from './app/store.ts';
import { Outlet } from "react-router-dom";

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
