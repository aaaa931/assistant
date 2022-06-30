import React, { useEffect, useMemo, useState } from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./component/nav";
import { web_style } from "./component/btn";
import Note from "./note";
// import theme from "./component/theme";
// import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import Item from "./item";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
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

/*const getTheme = (mode) => ({
    palette: {
        mode,
        primary: {
            ...(mode === "light" ? { main: "#e8e8e8" } : { main: "#1f2022" }),
        },
        success: {
            ...(mode === "light" ? { main: "#2cce82" } : { main: "#196354" }),
        },
        danger: {
            ...(mode === "light" ? { main: "#fa8a93" } : { main: "#dc3545" }),
        },
        text: {
            ...(mode === "light"
                ? { primary: "#828282" }
                : { primary: "#ccc" }),
        },
    },
    components: {
        MuiButtonBase: {},
    },
});

const theme = createTheme(getTheme("dark"));*/

render(
    <Provider store={store}>
        {/* <ThemeProvider theme={theme}> */}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="note" element={<Note /*data={noteData}*/ />} />
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
        {/* </ThemeProvider> */}
    </Provider>,
    document.getElementById("root")
);

web_style();
