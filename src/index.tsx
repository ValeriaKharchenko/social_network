import React from 'react';
import './index.scss';
import App from './App';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Home from "./components/home";
import {createRoot} from "react-dom/client";

const container = document.getElementById('container');
const root = createRoot(container!);

root.render(
    <BrowserRouter>
        <App/>
        <Routes>
            <Route path={"/"} element={<Login/>}></Route>
            {/* <Route path={"login"} element={<Login/>}></Route> */}
            <Route path={"register"} element={<Register/>}></Route>
        </Routes>

    </BrowserRouter>);