// import { ThemeProvider } from "@emotion/react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BtnSwitch from "./btn";
import {
    createTheme,
    useTheme,
    ThemeProvider,
    alpha,
    styled,
} from "@mui/material/styles";
// import theme, { NavContainer, Text, TextUrl } from "./theme";
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
} from "@mui/material";
// import { MenuIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const getTheme = (mode) => ({
    palette: {
        mode,
        primary: {
            ...(mode === "light" ? { main: "#e8e8e8" } : { main: "#1f2022" }),
        },
        success: {
            ...(mode === "light" ? { main: "#2cce82" } : { main: "#196354" }),
        },
        danger: {
            ...(mode === "light" ? { main: "#fa8a93" } : { main: "#dc3545" }),
        },
        text: {
            ...(mode === "light"
                ? { primary: "#828282" }
                : { primary: "#ccc" }),
        },
    },
    components: {
        MuiButtonBase: {},
    },
});

const theme = createTheme(getTheme("dark"));

/*const NavBrand = () => (
    <section className="navbar-brand ms-lg-5 ms-3">
        <Link to={"/"} className="navbar-brand">
            <TextUrl>個人數位助理</TextUrl>
        </Link>
    </section>
);

const NavToggler = () => (
    <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
    >
        <Text className="bi bi-list"></Text>
    </button>
);*/

const webList = {
    首頁: "",
    記事: "note",
    項目: "item",
    記帳: "accounting",
    紀錄: "record",
};

const linkStyle = {
    textDecoration: "none",
    color: "text.primary",
    "&:hover": {
        color: "text.primary",
    },
};

const ModeSwitch = styled(Switch)(({ theme }) => ({
    // light mode: "#ffc107"
    // dark mode: "#094f86"
    // color
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#ffc107",
        "&:hover": {
            backgroundColor: alpha(
                "#ffc107",
                theme.palette.action.hoverOpacity
            ),
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: "#094f86",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#ffc107",
    },
}));

const NavList = (props) => {
    const lists = Object.entries(webList).map(([webName, webUrl]) => (
        <MenuItem
            key={webName}
            onClick={props.onClick}
            divider={true}
            sx={{
                width: "40vw",
                justifyContent: "center",
            }}
        >
            <Typography
                textAlign="center"
                variant="h6"
                component={Link}
                to={webUrl}
                sx={linkStyle}
            >
                {webName}
            </Typography>
        </MenuItem>
    ));

    return lists;
};

const NavBrand = () => (
    <Stack direction="row" flexGrow={1} alignItems="center">
        <MenuBookIcon
            size="large"
            sx={{
                marginX: 5,
            }}
        />
        <Typography variant="h6" component={Link} to={"/"} sx={linkStyle}>
            個人數位助理
        </Typography>
    </Stack>
);

const NavMenu = () => {
    const [nav, setNav] = useState(null);

    const handleOpen = (e) => {
        setNav(e.currentTarget);
    };

    const handleClose = (e) => {
        setNav(null);
    };

    return (
        <Stack
            sx={{
                display: { md: "none" },
            }}
        >
            <IconButton size="large" onClick={handleOpen}>
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={nav}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(nav)}
                onClose={handleClose}
            >
                <NavList onClick={handleClose} />
            </Menu>
        </Stack>
    );
};

const NavMenuList = (props) => {
    const lists = Object.entries(webList).map(([webName, webUrl]) => (
        <Button key={webName} onClick={props.onClick}>
            {/* <Link to={webUrl}>
                <Typography textAlign="center" variant="h6">
                    {webName}
                </Typography>
            </Link> */}
            <Typography
                textAlign="center"
                variant="h6"
                component={Link}
                to={webUrl}
                sx={linkStyle}
            >
                {webName}
            </Typography>
        </Button>
    ));

    lists.push(
        <Stack direction="row" alignItems="center" key={"darkmode"} ml={3}>
            <Typography variant="h6">深色模式</Typography>
            <ModeSwitch />
        </Stack>
    );

    return (
        <Stack
            direction="row"
            mr={5}
            sx={{ display: { xs: "none", md: "flex" } }}
        >
            {lists}
        </Stack>
    );
};

/*const NavList = (props) => {
    const lists = Object.entries(webList).map(([webName, webUrl]) => (
        <li className="nav-item" key={webName}>
            <Link to={webUrl} className="nav-link">
                <Text>{webName}</Text>
            </Link>
        </li>
    ));

    return (
        <section className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto me-lg-5">{lists}</ul>
            <BtnSwitch styleChange={props.styleChange} />
        </section>
    );
};*/

export default function Nav(props) {
    const [style, setStyle] = useState(localStorage.getItem("webStyle"));

    const styleChange = (style) => {
        setStyle(style);
        localStorage.setItem("webStyle", style);
    };

    return (
        /*<ThemeProvider theme={theme[style]}>
            <NavContainer className="navbar navbar-expand-lg">
                <section className="container-fluid">
                    <NavBrand></NavBrand>
                    <NavToggler></NavToggler>
                    <NavList styleChange={styleChange}></NavList>
                </section>
            </NavContainer>
            <Outlet />
        </ThemeProvider>*/
        <ThemeProvider theme={theme}>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <NavBrand />
                        <NavMenu />
                        <NavMenuList />
                    </Toolbar>
                </Container>
            </AppBar>
            <div className="body"></div>
            <Outlet />
        </ThemeProvider>
    );
}
