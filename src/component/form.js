import React from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    TextField,
    Autocomplete,
    Alert,
} from "@mui/material";

const DataList = (props) => (
    <Autocomplete
        options={props.options}
        onInputChange={props.onChange}
        fullWidth
        freeSolo
        renderInput={(params) => (
            <TextField
                {...params}
                label={props.text}
                variant="filled"
                inputProps={{
                    ...params.inputProps,
                    maxLength: 10,
                }}
                fullWidth
                required
            />
        )}
    />
);

const InputN = (props) => (
    <TextField
        required
        fullWidth
        type="number"
        variant="filled"
        onChange={props.onChange}
        label={props.text}
        inputProps={{
            min: props.min,
            max: props.max,
        }}
    />
);

const InputT = (props) => (
    <TextField
        required
        variant="filled"
        onChange={props.onChange}
        label={props.text}
        inputProps={{
            maxLength: props.maxLength,
        }}
    />
);

const ErrorMsg = (props) => (
    <Box mb={3} sx={{ display: props.alert ? "block" : "none" }}>
        <Alert severity="error">{props.msg}</Alert>
    </Box>
);

const Submit = (props) => (
    <Box py={3}>
        <Button
            type="submit"
            variant="contained"
            fullWidth
            className="h-300rem"
        >
            新增
        </Button>
    </Box>
);

const VerticalForm = (props) => (
    <Container className="container col-lg-4 vh-90 d-flex align-items-center">
        {props.text}
    </Container>
);

const Title = (props) => (
    <Typography textAlign="center" variant="h4" mb={3}>
        {props.text}
    </Typography>
);

export default DataList;
export {
    InputN,
    InputT,
    // Username,
    // Password,
    ErrorMsg,
    Submit,
    VerticalForm,
    Title,
};
