import { configureStore } from "@reduxjs/toolkit";
import noteSliceReducer from "./noteSlice";
import itemSliceReducer from "./itemSlice";
import accountingSliceReducer from "./accountingSlice";

export default configureStore({
    reducer: {
        noteSlice: noteSliceReducer,
        itemSlice: itemSliceReducer,
        accountingSlice: accountingSliceReducer,
    },
});
