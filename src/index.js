import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Exercice from './components/Exercice';
import Course from './components/Course';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<App />} >
        <Route index element={<Exercice />} />

        <Route path="courses" element={<Course />} >
          <Route path=":category_id" element={<Course />} />
        </Route>
        <Route path="exercices" element={<Exercice />}>
          <Route path=":category_id" element={<Exercice />} />
        </Route>

      </Route>
    </Routes>
  </BrowserRouter >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
