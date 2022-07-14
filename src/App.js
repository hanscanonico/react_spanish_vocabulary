import React from 'react';
import './App.css';
import Header from './components/Header';
import Exercice from './components/Exercice';
import Course from './components/Course';

class App extends React.Component {

  state = {
    translations: [],
    inputsUser: [],
    inputsState: [],
    categories: [],
    current_category_id: -1,
    content: "exercice"
  }

  componentDidMount() {
    this.fetchTranslations()
    this.fetchCategories()
  }

  fetchTranslations(contentForce, current_category_id_forced) {
    const content = contentForce || this.state.content
    const current_category_id = current_category_id_forced || this.state.current_category_id
    let url = 'http://localhost:3000/'
    if (contentForce !== undefined) {

    }
    if (content == "exercice") {
      url += 'translations.json'
    }
    else if (content == "course") {
      url += 'revision/index.json'
    }

    if (current_category_id > -1) {
      url += '?category_id=' + current_category_id
    }
    console.log("url : " + url)
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

  handleCategory = (event, category_id, content) => {
    event.preventDefault()
    this.setState({
      current_category_id: category_id,
      content: content
    })
    this.fetchTranslations(content, category_id)
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

  renderContent() {
    const { translations, inputsUser, inputsState, categories, current_category_id, content } = this.state
    switch (content) {
      case "exercice":
        return <Exercice translations={translations} inputsUser={inputsUser}
          inputsState={inputsState} handleNext={this.handleNext} handleCorrection={this.handleCorrection} handleChange={this.handleChange} />
        break;
      default:
        return <Course translations={translations} />
    }
  }

  render() {
    let content = this.renderContent()
    const { categories } = this.state
    return (
      <div>
        <Header categories={categories} handleCategory={this.handleCategory} />
        {content}
      </div >
    );
  }

}

export default App;
