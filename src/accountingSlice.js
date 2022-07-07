import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const fetchAccounting = createAsyncThunk(
    "fetchAccounting",
    async (filter, { dispatch }) => {
        const response = (await api("accounting", "get", filter))
            ? await api("accounting", "get", filter)
            : [];
        console.log("fetchAccounting response :>> ", response);
        dispatch(setAccountingData(response));

        return response;
    }
);

export const accountingSlice = createSlice({
    name: "accountingSlice",
    initialState: {
        accountingData: [],
        accountingId: null,
        accountingPrice: 0,
        accountingTotal: 0,
    },
    reducers: {
        setAccountingData: (state, action) => {
            state.accountingData = action.payload;
        },
        setAccountingId: (state, action) => {
            state.accountingId = action.payload;
        },
        setAccountingPrice: (state, action) => {
            state.accountingPrice = action.payload;
        },
        setAccountingTotal: (state, action) => {
            state.accountingTotal = action.payload;
        },
    },
});

export const {
    setAccountingData,
    setAccountingId,
    setAccountingPrice,
    setAccountingTotal,
} = accountingSlice.actions;
export const selectAccountingData = (state) =>
    state.accountingSlice.accountingData;
export const selectAccountingId = (state) => state.accountingSlice.accountingId;
export const selectAccountingPrice = (state) =>
    state.accountingSlice.accountingPrice;
export const selectAccountingTotal = (state) =>
    state.accountingSlice.accountingTotal;
export default accountingSlice.reducer;
