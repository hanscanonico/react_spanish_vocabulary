import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Exercice from './Exercice';
import Course from './Course';

const MainContent = (props) => {
    const page = useSelector((state) => state.translations.page);

    const getContent = () => {
        switch (page) {
            case "exercice":
                return <Exercice />
            default:
                return <Course />
        }
    }

    let content = getContent();
    return (<div>{content}</div>)

}
export default MainContent;
