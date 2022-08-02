import React, { useEffect } from 'react';
import TranslationExerciceList from './TranslationExerciceList';
import { useSelector, useDispatch } from 'react-redux';
import { loadTranslations, setInputsState } from '../redux';
const Exercice = (props) => {

    const translations = useSelector((state) => state.translations.list);
    const page = useSelector((state) => state.translations.page);
    const category_id = useSelector((state) => state.translations.category_id);
    const inputsUser = useSelector((state) => state.translations.inputsUser);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTranslations(page, category_id));
    }, [dispatch]);

    const handleNext = () => {
        dispatch(loadTranslations(page, category_id));
    }

    const handleCorrection = () => {
        translations.map(function (translation) {
            dispatch(setInputsState({ value: "is-valid", id: translation.id }));
            if (inputsUser[translation.id].normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== translation.correction.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
                dispatch(setInputsState({ value: "is-invalid", id: translation.id }));
            }
        });
    }

    return (<div className="container">
        <div className="text-center mb-4">
            <h1 className="display-3">Find The Answer</h1>
        </div>
        <div>
            <TranslationExerciceList />
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

export default Exercice;