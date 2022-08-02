import React, { useEffect } from 'react';
import { loadTranslations } from '../redux';
import { useSelector, useDispatch } from 'react-redux';

const Course = (props) => {
    const translations = useSelector((state) => state.translations.list);
    const page = useSelector((state) => state.translations.page);
    const category_id = useSelector((state) => state.translations.category_id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTranslations(page, category_id));
    }, [dispatch]);

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