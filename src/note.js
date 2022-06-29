import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { web_style } from "./component/btn";
import Task from "./component/task";
import theme, {
    // Container,
    // Input,
    Label,
    Section,
    Btn,
} from "./component/theme";
import { Box, Button, Container, Grid, Input, Stack } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
    selectFilter,
    selectNote,
    setFilter,
    setNote,
    addNote,
    putNote,
    delNote,
    fetchNote,
} from "./noteSlice";

const NoteInput = (props) => {
    const [name, setName] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        props.addRow(name);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        /*<form className="form row" onSubmit={handelSubmit}>
            <section className="col-lg-2 col-12 ms-3">
                <Label htmlFor="inputNote theme-text">輸入待辦事項：</Label>
            </section>
            <section className="col-lg-10 col-12 ms-3">
                <Input
                    id="inputNote"
                    className="form-control"
                    value={name}
                    onChange={handleChange}
                />
            </section>
        </form>*/
        <form onSubmit={handelSubmit}>
            <Box p={2}>
                <Label htmlFor="inputNote">輸入待辦事項：</Label>
                <Input
                    id="inputNote"
                    value={name}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>
        </form>
    );
};
/*
const noteData = [
    { id: 0, name: "test1", completed: true },
    { id: 1, name: "test2", completed: true },
    { id: 2, name: "test3", completed: true },
];
localStorage.setItem("noteData", JSON.stringify(noteData));
*/
const FilterBtn = (props) => {
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        web_style();
    }, []);

    return (
        <Button
            variant="contained"
            fullWidth
            onClick={() => {
                async function setfilter() {
                    dispatch(setFilter(props.name));
                    await props.fetchData(filter);
                }
                setfilter();
            }}
        >
            {props.name}
        </Button>
        // <Btn
        //     className="btn w-90-3 mx-lg-3 mx-1"
        //     onClick={() => {
        //         //props.setFilter(props.name);
        //         async function setfilter() {
        //             dispatch(setFilter(props.name));
        //             await props.fetchData(filter);
        //         }
        //         setfilter();
        //     }}
        // >
        //     {props.name}
        // </Btn>
    );
};

const filterType = {
    all: () => true,
    active: (note) => note.status == "active", //!note.completed,
    completed: (note) => note.status == "completed", //note.completed,
};

const filterName = Object.keys(filterType);

const Edit = (props) => {
    //const [note, setNote] = useState(props.data);
    //const [note, setNote] = useState(null);
    const note = useSelector(selectNote);
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();
    //const [filter, setFilter] = useState("all");

    console.log("note :>> ", note);

    /*async function fetchData() {
        const result = await getNote(filter); //getNote();
        console.log("result :>> ", result);
        // setNote(result);
        dispatch(setNote(result));
    }*/

    useEffect(() => {
        //fetchData();
        dispatch(fetchNote(filter));
        web_style();
    }, [filter]);

    useEffect(() => {
        //fetchData();
        dispatch(fetchNote(filter));
        web_style();
    }, []);

    // init
    /*if (!note) {
        const initNote = [
            {
                id: "note" + nanoid(),
                name: "從這一筆資料開始",
                completed: false,
            },
        ];
        localStorage.setItem("noteData", JSON.stringify(initNote));
    }*/

    async function addRow(name) {
        const newNote = {
            data: name,
            status: "active",
        };

        // await addNote(newNote);
        // await fetchData();
        await dispatch(addNote(newNote));
        await dispatch(fetchNote());
    }

    async function toggleCompleted(id) {
        let newNote = note.find((note) => note.id === id);

        console.log("newNote :>> ", newNote);

        if (newNote.status == "active") {
            newNote = { ...newNote, status: "completed" };
        } else {
            newNote = { ...newNote, status: "active" };
        }

        // await putNote(newNote);
        // await fetchData();
        await dispatch(putNote(newNote));
        await dispatch(fetchNote(newNote));
    }

    async function deleteNote(id) {
        // await delNote(id);
        // await fetchData();
        await dispatch(delNote(id));
        await dispatch(fetchNote());
    }

    async function editNote(id, name) {
        let newNote = note.find((note) => note.id === id);
        console.log("newNote :>> ", newNote);
        console.log("name :>> ", name);

        newNote = { ...newNote, data: name };

        // await putNote(newNote);
        // await fetchData();
        await dispatch(putNote(newNote));
        await dispatch(fetchNote(newNote));
    }

    const filterList = filterName.map((name) => (
        /*<FilterBtn
            key={name}
            name={name}
            setFilter={setFilter}
            fetchData={() => dispatch(fetchNote())}
        />*/
        // <Grid item xs={4}>
        <FilterBtn
            key={name}
            name={name}
            setFilter={setFilter}
            fetchData={() => dispatch(fetchNote())}
            fullWidth
        />
        // </Grid>
    ));

    const noteList = note
        ? note.filter(filterType[filter]).map((note) => (
              /*<Task
                      id={note.id}
                      name={note.data}
                      completed={note.status == "completed" ? true : false}
                      key={note.id}
                      toggleCompleted={toggleCompleted}
                      deleteNote={deleteNote}
                      editNote={editNote}
                  />*/
              //   <Grid item xs={12} key={note.id}>
              <Task
                  id={note.id}
                  name={note.data}
                  completed={note.status == "completed" ? true : false}
                  toggleCompleted={toggleCompleted}
                  deleteNote={deleteNote}
                  editNote={editNote}
              />
              //   </Grid>
          ))
        : [];

    return (
        <Container>
            <Stack spacing={2}>
                <NoteInput data={note} addRow={addRow} />
                <Stack direction="row" spacing={2} p={2}>
                    {filterList}
                </Stack>
                {noteList}
            </Stack>
            {/* <Container className="container my-5">
            <section className="row mb-5">
                <NoteInput data={note} addRow={addRow} />
            </section>
            <section className="row mb-5">
                <section className="d-flex justify-content-center ps-4 ps-lg-0">
                    {filterList}
                </section>
            </section>
            <section className="row mb-5">
                <ul className="my-0 px-3 none-list">{noteList}</ul>
            </section> */}
        </Container>
    );
};

export default Edit;
