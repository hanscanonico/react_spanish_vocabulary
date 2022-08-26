import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// @ts-ignore 
import { selectTranslations, TranslationsState, selectTranslationStatus } from './translationSlice.ts';
// @ts-ignore 
import { fetchCourseAsync } from './translationSlice.ts';
// @ts-ignore 
import { useAppSelector } from '../../app/hook.ts';
// @ts-ignore 
import { STATUSES } from './translationSlice.ts';

const Course = (props) => {
    const translations: TranslationsState = useSelector(selectTranslations);
    const status = useAppSelector(selectTranslationStatus);
    let { category_id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCourseAsync(category_id));
    }, [category_id]);

    let content: JSX.Element;

    if (status !== STATUSES.SUCCESS) {
        content = <div className="text-center">{status}</div>
    }
    else {
        content = translations.map(function (translation, id) {
            return (<div key={translation.id} className="row">
                <div className="col-lg-1 offset-lg-5">
                    <p>{translation.key}</p>
                </div>
                <div className="col-lg-1">
                    <p>{translation.value}</p>
                </div>
            </div>)
        })
    }

    return (<div className="container">
        <div className="text-center mb-4">
            <h1 className="display-3">Course</h1>
        </div>
        {content}
    </div >
    )
}

export default Course;