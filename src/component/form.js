import React from "react";
// import {
//     Label,
//     Input,
//     Span,
//     Text,
//     Btn,
//     BtnSuccess,
//     BtnDanger,
//     Container,
// } from "./theme";
import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    Tooltip,
    MenuItem,
    Switch,
    FormGroup,
    FormControlLabel,
    TextField,
    Autocomplete,
    CssBaseline,
    Alert,
} from "@mui/material";

const DataList = (props) => (
    // <Label className="col-lg-6 mb-3">
    //     {props.text}
    //     <Input
    //         list={props.id}
    //         id={props.inputId}
    //         placeholder={props.placeholder}
    //         minLength={props.minLength}
    //         maxLength={props.maxLength}
    //         className="form-control"
    //         onChange={props.onChange}
    //     ></Input>
    //     <datalist id={props.id}>{props.option}</datalist>
    // </Label>
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
    // <Label className="col-lg-6 mb-3">
    //     {props.text}
    //     <Input
    //         type="number"
    //         id={props.id}
    //         placeholder={props.placeholder}
    //         min={props.min}
    //         max={props.max}
    //         className="form-control"
    //         onChange={props.onChange}
    //     ></Input>
    // </Label>
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
    // <Label className="col-lg-6 mb-3">
    //     {props.text}
    //     <Input
    //         className="form-control"
    //         placeholder={props.placeholder}
    //         minLength={props.minLength}
    //         maxLength={props.maxLength}
    //         onChange={props.onChange}
    //     ></Input>
    // </Label>
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

// const Username = (props) => (
//     <Label className="mb-3">
//         {props.text}
//         <Input
//             name={props.name}
//             className="form-control"
//             pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$"
//             placeholder={props.placeholder}
//             minLength={props.minLength}
//             maxLength={props.maxLength}
//             onChange={props.onChange}
//             required
//         ></Input>
//     </Label>
// );

// const Password = (props) => (
//     <Label className="mb-3">
//         {props.text}
//         <Input
//             name={props.name}
//             type="password"
//             className="form-control"
//             pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$"
//             placeholder={props.placeholder}
//             minLength={props.minLength}
//             maxLength={props.maxLength}
//             onChange={props.onChange}
//             required
//         ></Input>
//     </Label>
// );

const ErrorMsg = (props) => (
    // <section
    //     className="alert alert-danger display-none"
    //     id="alert"
    //     ref={props.ref}
    // >
    //     {props.msg}
    // </section>
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

// const Title = (props) => (
//     <h2 className="text-center mb-3">
//         <Text>{props.text}</Text>
//     </h2>
// );

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
