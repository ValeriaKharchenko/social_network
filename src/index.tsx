import './index.scss';
import App from './App';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {createRoot} from "react-dom/client";

// FOR REDUX
import store from './redux/store';
import { Provider } from 'react-redux';

const container = document.getElementById('container');
const root = createRoot(container!);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>);