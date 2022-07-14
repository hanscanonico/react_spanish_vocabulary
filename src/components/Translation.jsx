import React from 'react';

class Translation extends React.Component {
    render() {
        const { translation, inputsUser, inputsState } = this.props
        const isKey = translation.type === "key";
        let className = 'form-control mb-3 ' + inputsState[translation.id];
        let divCorrection = ""
        if (inputsState[translation.id] == "is-invalid") {
            divCorrection = <div className="col-lg-2 text-danger" role="alert">{translation.correction}</div>
        }
        else if (inputsState[translation.id] == "is-valid") {
            divCorrection = <div className="col-lg-2 text-success" role="alert">{translation.correction}</div>
        }
        return (
            <div className="row" >
                <div className="col-lg-2 offset-lg-4">
                    {translation.text_to_show}
                </div>
                <div className="col-lg-2">

                    <input id={translation.id} className={className}
                        value={inputsUser[translation.id]} onChange={this.props.handleChange}></input>
                </div>

                {divCorrection}

            </div >
        )
    }
}

export default Translation;
