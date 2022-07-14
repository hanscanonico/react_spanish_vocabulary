import React from 'react';
import Translation from './Translation';

class TranslationExerciceList extends React.Component {

    render() {
        const translations = [...this.props.translations]
        const inputsUser = [...this.props.inputsUser]
        const inputsState = [...this.props.inputsState]
        const handleChange = this.props.handleChange
        return (
            <ul>
                {translations.map(function (translation, id) {
                    return (<Translation key={id} translation={translation} inputsUser={inputsUser}
                        handleChange={handleChange} inputsState={inputsState} />)
                })}
            </ul>
        );
    }
}

export default TranslationExerciceList;
