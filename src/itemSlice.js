import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const fetchItem = createAsyncThunk(
    "fetchItem",
    async (filter, { dispatch }) => {
        const response = await api("item", "get", filter);
        console.log("fetchItem response :>> ", response);
        dispatch(setItemData(response));

        return response;
    }
);

export const itemSlice = createSlice({
    name: "itemSlice",
    initialState: {
        itemData: [],
        itemType: null,
        itemId: null,
        itemName: null,
    },
    reducers: {
        setItemData: (state, action) => {
            state.note = action.payload;
        },
        setItemType: (state, action) => {
            state.filter = action.payload;
        },
        setItemId: (state, action) => {
            state.filter = action.payload;
        },
        setItemName: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { setItemData, setItemType, setItemId, setItemName } =
    itemSlice.actions;
export const selectItemData = (state) => state.itemSlice.itemData;
export const selectItemType = (state) => state.itemSlice.itemType;
export const selectItemId = (state) => state.itemSlice.itemId;
export const selectItemName = (state) => state.itemSlice.itemName;
export default itemSlice.reducer;
