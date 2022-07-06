import { configureStore } from "@reduxjs/toolkit";
import noteSliceReducer from "./noteSlice";
import itemSliceReducer from "./itemSlice";

export default configureStore({
    reducer: {
        noteSlice: noteSliceReducer,
        itemSlice: itemSliceReducer,
    },
});
