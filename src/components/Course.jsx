import React from 'react';
import TranslationList from './TranslationExerciceList';
class Course extends React.Component {


    render() {
        const { translations } = this.props
        return (<div className="container">
            <div className="text-center mb-4">
                <h1 className="display-3">Course</h1>
            </div>
            {translations.map(function (translation, id) {
                return (<div key={translation.id} className="row">
                    <div className="col-lg-1 offset-lg-5">
                        <p>{translation.key}</p>
                    </div>
                    <div className="col-lg-1">
                        <p>{translation.value}</p>
                    </div>

                </div>)
            })}
        </div >
        )

    }
}

export default Course;