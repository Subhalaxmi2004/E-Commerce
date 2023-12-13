import React from "react";
import  ReactDOM  from "react-dom";
import "./index.css";
import App from "./App";
import { Store } from "./redux/Store.jsx";
import { Provider} from "react-redux";
import MyContextProvider from './context/data/MyContext';

ReactDOM.render(
<>
<Provider store = {Store}>
<App/>
</Provider>

</>
,document.getElementById('root')

);
