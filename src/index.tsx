import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import {createRoot} from "react-dom/client";

const container = document.getElementById('container');
const root = createRoot(container!);

root.render(
    <BrowserRouter>
        <App/>
        <Routes>
            <Route path={"/"} element={<Home/>}></Route>
            <Route path={"login"} element={<Login/>}></Route>
            <Route path={"register"} element={<Register/>}></Route>
        </Routes>

    </BrowserRouter>);