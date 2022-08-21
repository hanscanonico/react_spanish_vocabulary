import React from 'react';
// @ts-ignore 
import Translation from './Translation.tsx';

import { useSelector, useDispatch } from 'react-redux';
const TranslationExerciceList = (props) => {

    const translations = useSelector((state) => state.translations.list);

    return (
        <ul>
            {translations.map(function (translation, id) {
                return (<Translation key={id} translation={translation} />)
            })}
        </ul>
    );
}


export default TranslationExerciceList;
