import React from "react";
import { render } from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./component/nav";
import { web_style } from "./component/btn";
import Note from "./note";
import { Provider } from "react-redux";
import Item from "./item";
// import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import init from "./init";
import Accounting from "./accounting";
import Dashboard from "./dashboard";
import Record from "./record";
import store from "./store";
init();

render(
    <Provider store={store}>
        {/* <ThemeProvider theme={theme}> */}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="note" element={<Note />} />
                    <Route path="item" element={<Item />} />
                    <Route path="accounting" element={<Accounting />} />
                    <Route path="record" element={<Record />} />
                </Route>
            </Routes>
        </BrowserRouter>
        {/* </ThemeProvider> */}
    </Provider>,
    document.getElementById("root")
);

web_style();
