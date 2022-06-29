import React, { useEffect, useMemo, useState } from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./component/nav";
import { web_style } from "./component/btn";
import Note from "./note";
// import theme from "./component/theme";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import Item from "./item";
import { createTheme } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";
import init, {
    //noteData,
    itemData,
    itemCol,
    accountingCol,
    accountingData,
} from "./init";
import Accounting from "./accounting";
import Dashboard from "./dashboard";
import Record from "./record";
import store from "./store";
init();

const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Nav />}>
                        <Route path="" element={<Dashboard />} />
                        <Route
                            path="note"
                            element={<Note /*data={noteData}*/ />}
                        />
                        <Route
                            path="item"
                            element={<Item data={itemData} col={itemCol} />}
                        />
                        <Route
                            path="accounting"
                            element={
                                <Accounting
                                    data={accountingData}
                                    col={accountingCol}
                                />
                            }
                        />
                        <Route path="record" element={<Record />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);

web_style();
