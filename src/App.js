import React from 'react';
import './App.css';
import TranslationList from './components/TranslationList';
import Header from './components/Header';

class App extends React.Component {

  state = {
    translations: [],
    inputsUser: [],
    inputsState: [],
    categories: [],
    current_category_id: -1
  }

  componentDidMount() {
    this.fetchTranslations()
    this.fetchCategories()
  }

  fetchTranslations() {
    const current_category_id = this.state.current_category_id
    let url = 'http://localhost:3000/translations.json'
    if (current_category_id > -1) {
      url += '?category_id=' + current_category_id
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let inputsUser = []
        let translations = []
        let inputsState = []
        data.map(function (translation, idx) {
          inputsUser[translation.id] = ""
          inputsState[translation.id] = ""
          translations[translation.id] = translation
          if (translation.type === "key") {
            translation.correction = translation.value
          }
          else {
            translation.correction = translation.key
          }

        });
        this.setState({
          translations: data,
          inputsUser: inputsUser,
          inputsState: inputsState
        })

      });
  }

  handleCategory = (event, category_id) => {
    event.preventDefault()
    this.setState({ current_category_id: category_id })
    this.fetchTranslations()
  }

  fetchCategories() {
    fetch('http://localhost:3000/categories.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          categories: data
        })
      });
  }

  handleNext = () => {
    this.fetchTranslations();
  }

  handleCorrection = () => {

    const translations = [...this.state.translations]
    const inputsUser = [...this.state.inputsUser]
    let inputsState = [...this.state.inputsState]

    translations.map(function (translation) {
      inputsState[translation.id] = "is-valid"
      if (inputsUser[translation.id].normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== translation.correction.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
        inputsState[translation.id] = "is-invalid"
      }
    });
    this.setState({
      inputsState: inputsState
    })
  }

  handleChange = (event) => {
    event.preventDefault();
    const { value, id } = event.target
    let inputsUser = [...this.state.inputsUser]
    inputsUser[id] = value
    this.setState({
      inputsUser: inputsUser
    })
  }

  render() {
    return (
      <div>
        <Header categories={this.state.categories} handleCategory={this.handleCategory} />
        <div className="container">
          <div className="text-center mb-4">
            <h1 className="display-3">Find The Answer</h1>
          </div>
          <div>
            <TranslationList translations={this.state.translations} inputsUser={this.state.inputsUser}
              inputsState={this.state.inputsState} handleChange={this.handleChange} />
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-2">
              <button className="btn btn-primary col-lg-2 offset-lg-5 mr-1 mb-1" onClick={this.handleCorrection}>Correction</button>
              <button className="btn btn-primary offset-sm-1 col-lg-2 mb-1 ml-1" onClick={this.handleNext}>Next</button>
            </div>
          </div>
        </div >
      </div >
    );
  }

}

export default App;
