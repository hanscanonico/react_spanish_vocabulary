import React from 'react';
import TranslationExerciceList from './TranslationExerciceList';
class Exercice extends React.Component {


    render() {
        const { translations, inputsUser, inputsState, handleCorrection, handleNext, handleChange } = this.props
        return (<div className="container">
            <div className="text-center mb-4">
                <h1 className="display-3">Find The Answer</h1>
            </div>
            <div>
                <TranslationExerciceList translations={translations} inputsUser={inputsUser}
                    inputsState={inputsState} handleChange={handleChange} />
            </div>
            <div className="row">
                <div className="col-lg-6 offset-lg-2">
                    <button className="btn btn-primary col-lg-2 offset-lg-5 mr-1 mb-1" onClick={handleCorrection}>Correction</button>
                    <button className="btn btn-primary offset-sm-1 col-lg-2 mb-1 ml-1" onClick={handleNext}>Next</button>
                </div>
            </div>
        </div >
        )

    }
}

export default Exercice;