import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// @ts-ignore 
import { fetchCourse } from './translationAPI.ts';

// @ts-ignore 
import { useAppSelector, useAppDispatch } from '../../app/hook.ts';
// @ts-ignore 
import { selectTranslations, TranslationsState } from './translationSlice.ts';
// @ts-ignore 
import { fetchCourseAsync } from './translationSlice.ts';

const Course = (props) => {
    const translations: TranslationsState = useSelector(selectTranslations);
    const [translationsData, setTranslationsData] = useState(translations);
    let { category_id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCourseAsync(category_id));
    }, [category_id]);

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

export default Course;