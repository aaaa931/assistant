import React, { useState } from "react";
import { BtnDanger, BtnSuccess /*Container, Input*/ } from "./theme";
import {
    Box,
    Button,
    Input,
    Grid,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Typography,
} from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";

const Task = (props) => {
    const [edit, setEdit] = useState(false);
    const [newName, setNewName] = useState("");

    const handleChange = (e) => {
        setNewName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            console.log("e.keycode :>> ", e.keyCode);
            handleSubmit(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.editNote(props.id, newName);
        setNewName("");
        setEdit(false);
    };

    const editor = (
        /*<form className="form row" onSubmit={handleSubmit}>
            <Container key={props.id}>
                <Input
                    id={props.id}
                    className="form-control mx-3 mb-3"
                    placeholder={props.name}
                    value={newName}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <section className="col mb-3">
                    <BtnDanger
                        className="btn me-lg-3 w-90-2 h-300rem mx-3"
                        onClick={() => setEdit(false)}
                    >
                        取消
                    </BtnDanger>
                    <BtnSuccess className="btn me-lg-3 w-90-2 h-300rem">
                        確認
                    </BtnSuccess>
                </section>
            </Container>
        </form>*/
        <form onSubmit={handleSubmit}>
            {/* <Container key={props.id}> */}
            <Grid container p={2}>
                <Grid item xs={12} mb={3}>
                    <Input
                        placeholder={props.name}
                        value={newName}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} pr={2}>
                    <Button
                        className="h-300rem"
                        onClick={() => setEdit(false)}
                        fullWidth
                        variant="contained"
                        color="danger"
                    >
                        取消
                    </Button>
                </Grid>
                <Grid item xs={6} pl={2}>
                    <Button
                        className="h-300rem"
                        fullWidth
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                    >
                        確認
                    </Button>
                </Grid>
            </Grid>
            {/* </Container> */}
        </form>
    );

    const view = (
        /*<section className="row">
            <section key={props.id}>
                <input
                    type="checkbox"
                    id={props.id}
                    defaultChecked={props.completed}
                    className="form-check-input mt-0 mx-3 mb-3 theme-section-dark wh-25"
                    onChange={() => props.toggleCompleted(props.id)}
                />
                <label htmlFor={props.id}>{props.name}</label>
                <section className="col mb-3">
                    <BtnSuccess
                        className="btn me-lg-3 w-90-2 h-300rem mx-3"
                        onClick={() => setEdit(true)}
                    >
                        編輯
                    </BtnSuccess>
                    <BtnDanger
                        className="btn w-90-2 h-300rem"
                        onClick={() => props.deleteNote(props.id)}
                    >
                        刪除
                    </BtnDanger>
                </section>
            </section>
        </section>*/
        <Grid container p={2}>
            <Grid item xs={12} mb={3}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={
                                    <BookmarkBorder
                                        color="success"
                                        fontSize="large"
                                    />
                                }
                                checkedIcon={
                                    <Bookmark
                                        color="success"
                                        fontSize="large"
                                    />
                                }
                                checked={props.completed}
                                onChange={() => props.toggleCompleted(props.id)}
                            />
                        }
                        label={
                            <Typography sx={{ color: "text.primary" }}>
                                {props.name}
                            </Typography>
                        }
                    ></FormControlLabel>
                </FormGroup>
            </Grid>
            <Grid item xs={6} pr={2}>
                <Button
                    className="h-300rem"
                    onClick={() => setEdit(true)}
                    fullWidth
                    variant="contained"
                    color="success"
                >
                    編輯
                </Button>
            </Grid>
            <Grid item xs={6} pl={2}>
                <Button
                    className="h-300rem"
                    onClick={() => props.deleteNote(props.id)}
                    fullWidth
                    variant="contained"
                    color="danger"
                >
                    刪除
                </Button>
            </Grid>
        </Grid>
    );

    // return <li>{edit ? editor : view}</li>;
    return <>{edit ? editor : view}</>;
};

export default Task;
