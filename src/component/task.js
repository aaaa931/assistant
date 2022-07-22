import React, { useState } from "react";
import {
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
        <form onSubmit={handleSubmit}>
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
        </form>
    );

    const view = (
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

    return <>{edit ? editor : view}</>;
};

export default Task;
