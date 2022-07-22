// import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { web_style } from "./component/btn";
import Task from "./component/task";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { selectFilter, selectNote, setFilter, fetchNote } from "./noteSlice";
import api from "./api";

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
        <form onSubmit={handelSubmit}>
            <Box p={2}>
                <TextField
                    variant="filled"
                    label="輸入待辦事項："
                    value={name}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>
        </form>
    );
};

const FilterBtn = (props) => {
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();

    return (
        <Button
            className="h-300rem"
            variant="contained"
            fullWidth
            onClick={() => {
                async function setfilter() {
                    dispatch(setFilter({ status: props.name }));
                    await props.fetchData(filter);
                }
                setfilter();
            }}
        >
            {props.name}
        </Button>
    );
};

const filterType = {
    all: () => true,
    active: (note) => note.status == "active", //!note.completed,
    completed: (note) => note.status == "completed", //note.completed,
};

const filterName = Object.keys(filterType);

const Note = (props) => {
    const note = useSelector(selectNote);
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();

    console.log("note :>> ", note);

    const init = async () => {
        await dispatch(fetchNote(filter));
        web_style();
    };

    useEffect(() => {
        init();
    }, [filter]);

    useEffect(() => {
        init();
    }, []);

    async function addRow(name) {
        const newNote = {
            data: name,
            status: "active",
        };

        await api("record", "post", newNote);
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

        await api("record", "put", newNote);
        await dispatch(fetchNote());
    }

    async function deleteNote(id) {
        await api("record", "delete", id);
        await dispatch(fetchNote());
    }

    async function editNote(id, name) {
        let newNote = note.find((note) => note.id === id);
        console.log("newNote :>> ", newNote);
        console.log("name :>> ", name);

        newNote = { ...newNote, data: name };

        await api("record", "put", newNote);
        await dispatch(fetchNote());
    }

    const filterList = filterName.map((name) => (
        <FilterBtn
            key={name}
            name={name}
            setFilter={setFilter}
            fetchData={() => dispatch(fetchNote())}
            fullWidth
        />
    ));

    const noteList = note
        ? note
              .filter(filterType[filter.status])
              .map((note) => (
                  <Task
                      id={note.id}
                      name={note.data}
                      completed={note.status == "completed" ? true : false}
                      key={note.id}
                      toggleCompleted={toggleCompleted}
                      deleteNote={deleteNote}
                      editNote={editNote}
                  />
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
        </Container>
    );
};

export default Note;
