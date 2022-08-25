import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore 
import { Link } from "react-router-dom";
// @ts-ignore 
import { useAppSelector, useAppDispatch } from '../../app/hook.ts';
// @ts-ignore 
import { fetchCategoriesAsync, selectCategories } from './categorySlice.ts';
const Header = (props) => {

    const categories = useAppSelector(selectCategories);
    const [data, setData] = useState(categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesAsync());

    }, []);

    const handleCategory = (event, category_id, page) => {
        event.preventDefault()
        setData(fetchCategoriesAsync());

    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/exercices" className="navbar-brand">Spanish Vocabulary</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Revison
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to="/courses" className="dropdown-item">All</Link></li>
                                {categories.map(function (category, id) {
                                    return (<li key={category.id}><Link to={`/courses/${category.id}`} className="dropdown-item" >{category.name}</Link></li>)
                                })}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Exercices
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to="/exercices" className=" dropdown-item">All</Link></li>
                                {categories.map(function (category, id) {
                                    return (<li key={category.id}><Link to={`/exercices/${category.id}`} className="dropdown-item">{category.name}</Link></li>)
                                })}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div >
        </nav >
    );

}


export default Header;
