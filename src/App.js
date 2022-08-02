import React from 'react';
import './App.css';
import Header from './components/Header';
import Exercice from './components/Exercice';
import Course from './components/Course';
import MainContent from './components/MainContent';
import { Provider } from 'react-redux';
import store from './redux';
import { useSelector, useDispatch } from 'react-redux';
class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <MainContent />
        </div >
      </Provider>
    );
  }

}

export default App;
