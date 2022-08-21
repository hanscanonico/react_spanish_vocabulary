import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore 
import { setInputsUser } from '../redux.ts';
const Translation = (props) => {
    const dispatch = useDispatch();

    const inputsState = useSelector((state) => state.translations.inputsState);
    const inputsUser = useSelector((state) => state.translations.inputsUser);

    const handleChange = (event) => {
        event.preventDefault();
        const { value, id } = event.target
        dispatch(setInputsUser({ value, id }));
    }

    const { translation } = props
    const isKey = translation.type === "key";
    let className = 'form-control mb-3 ' + inputsState[translation.id];
    let divCorrection = <div />
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
                    value={inputsUser[translation.id]} onChange={event => handleChange(event)}></input>
            </div>
            {divCorrection}
        </div >
    )

}

export default Translation;
