import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import axios from "axios";

export const fetchNote = createAsyncThunk(
    "fetchNote",
    async (filter, { dispatch }) => {
        // const response = (await api("record", "get", filter))
        //     ? await api("record", "get", filter)
        //     : [];
        const data = await api("record", "get", filter);
        const response = data ? data : [];

        console.log("fetchNote response :>> ", response);
        dispatch(setNote(response));

        return response;
    }
);

const noteAPI = axios.create({
    // baseURL: "http://192.168.2.128:3000/api/",
    baseURL: "http://localhost:5000/",
    timeout: 2000,
});

async function getNote(type) {
    let result;
    console.log("getNote type :>> ", type);

    await noteAPI
        .get("record", { params: { status: type } })
        .then((res) => {
            console.log("getNote success :>> ");
            result = res.data;
        })
        .catch((error) => {
            console.log("getNote failed :>> ", error);
            result = error.data;
        });

    return result;
}

export const addNote = createAsyncThunk("addNote", async (data) => {
    await noteAPI
        .post("record", data)
        .then((res) => {
            console.log("post success :>> ");
        })
        .catch((error) => {
            console.log("post failed :>> ");
        });
});

export const putNote = createAsyncThunk("putNote", async (data) => {
    console.log("putNote data :>> ", data);
    await noteAPI
        .put("record/" + data.id, data)
        .then((res) => {
            console.log("put success :>> ");
        })
        .catch((error) => {
            console.log("put failed :>> ", error);
        });
});

export const delNote = createAsyncThunk("delNote", async (id) => {
    console.log("delNote id :>> ", id);
    await noteAPI
        .delete(`record/${id}`)
        .then((res) => {
            console.log("delete success :>> ");
        })
        .catch((error) => {
            console.log("delete failed :>> ");
        });
});

// export const fetchNote = createAsyncThunk(
//     "fetchNote",
//     async (filter, { dispatch }) => {
//         const response = await getNote(filter);
//         console.log("fetchnote filter :>> ", filter);
//         console.log("response :>> ", response);
//         dispatch(setNote(response));

//         return response;
//     }
// );

export const noteSlice = createSlice({
    name: "noteSlice",
    initialState: {
        note: null,
        // filter: "all",
        filter: { status: "all" },
    },
    reducers: {
        setNote: (state, action) => {
            state.note = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    /*extraReducers: (builder) => {
        builder.addCase(fetchNote.fulfilled, (state, action) => {
            state.note = action.payload;
        });
    },*/
});

export const { setNote, setFilter } = noteSlice.actions;
export const selectNote = (state) => state.noteSlice.note;
export const selectFilter = (state) => state.noteSlice.filter;
export default noteSlice.reducer;
