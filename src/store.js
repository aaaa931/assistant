import { configureStore } from "@reduxjs/toolkit";
import noteSliceReducer from "./noteSlice";

export default configureStore({
    reducer: {
        noteSlice: noteSliceReducer,
    },
});
