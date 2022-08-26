import React from 'react';
// @ts-ignore 
import Translation from './Translation.tsx';
// @ts-ignore 
import { selectTranslations, TranslationsState } from './translationSlice.ts';

import { useSelector, useDispatch } from 'react-redux';
import { TranslationState } from './TranslationSlice';
const TranslationExerciceList = (props) => {

    const translations: TranslationsState = useSelector(selectTranslations)

    return (
        <ul>
            {translations.map(function (translation: TranslationState, id: string) {
                return (<Translation key={id} translation={translation} />)
            })}
        </ul>
    );
}


export default TranslationExerciceList;
