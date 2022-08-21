import React, { useEffect } from 'react';
// @ts-ignore 
import { loadTranslations } from '../redux.ts';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Course = (props) => {
    const translations = useSelector((state) => state.translations.list);
    let { category_id } = useParams();
    if (category_id == undefined) {
        category_id = -1;
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTranslations("course", category_id));
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