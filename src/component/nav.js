// import { ThemeProvider } from "@emotion/react";
import React, { useState, useEffect } from "react";
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
    FormGroup,
    FormControlLabel,
    CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#094f86",
        "&:hover": {
            backgroundColor: alpha(
                "#094f86",
                theme.palette.action.hoverOpacity
            ),
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#094f86",
    },
    "& .MuiSwitch-switchBase": {
        color: "#ffc107",
        "&:hover": {
            backgroundColor: alpha(
                "#ffc107",
                theme.palette.action.hoverOpacity
            ),
        },
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
        backgroundColor: "#ffc107",
    },
}));

const NavList = (props) => {
    const menuItemStyle = {
        width: "50vw",
        justifyContent: "center",
    };

    const lists = Object.entries(webList).map(([webName, webUrl]) => (
        <MenuItem
            key={webName}
            onClick={props.onClick}
            divider={true}
            sx={menuItemStyle}
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

    lists.push(
        <MenuItem
            key={"darkmode"}
            onClick={props.onClick}
            divider={true}
            sx={menuItemStyle}
        >
            <Typography textAlign="center" variant="h6" sx={linkStyle}>
                深色模式
            </Typography>
            <ModeSwitch onChange={props.styleChange} checked={props.checked} />
        </MenuItem>
    );

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

const NavMenu = (props) => {
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
                <NavList
                    onClick={handleClose}
                    styleChange={props.styleChange}
                    checked={props.checked}
                />
            </Menu>
        </Stack>
    );
};

const NavMenuList = (props) => {
    const lists = Object.entries(webList).map(([webName, webUrl]) => (
        <Button key={webName} onClick={props.onClick}>
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
            <Typography variant="h6" sx={linkStyle}>
                深色模式
            </Typography>
            <ModeSwitch
                id="style_switch"
                onChange={props.styleChange}
                checked={props.checked}
            />
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

    const styleChange = () => {
        // console.log("style :>> ", style);
        // setStyle(style);
        // localStorage.setItem("webStyle", style);
        const themeBg = document.querySelectorAll(".theme-bg");

        if (style === "light") {
            localStorage.setItem("webStyle", "dark");
            themeFn(themeBg, "theme-bg-dark", "theme-bg-light");
        } else {
            localStorage.setItem("webStyle", "light");
            themeFn(themeBg, "theme-bg-light", "theme-bg-dark");
        }

        setStyle(localStorage.getItem("webStyle"));
    };

    const themeFn = (element, style1, style2) => {
        for (let i = 0; i < element.length; i++) {
            element[i].classList.add(style1);
            element[i].classList.remove(style2);
        }
    };

    const getTheme = (mode) => ({
        palette: {
            mode,
            primary: {
                ...(mode === "light"
                    ? { main: "#e8e8e8" }
                    : { main: "#1f2022" }),
            },
            success: {
                ...(mode === "light"
                    ? { main: "#2cce82" }
                    : { main: "#196354" }),
            },
            danger: {
                ...(mode === "light"
                    ? { light: "#fa8a93", main: "#fa8a93" }
                    : { light: "#fa8a93", main: "#dc3545" }),
            },
            text: {
                ...(mode === "light"
                    ? { primary: "#828282" }
                    : { primary: "#ccc" }),
            },
        },
    });

    const theme = createTheme(getTheme(style));

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
            <CssBaseline />
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <NavBrand />
                        <NavMenu
                            styleChange={styleChange}
                            checked={style === "dark" && true}
                        />
                        <NavMenuList
                            styleChange={styleChange}
                            checked={style === "dark" && true}
                        />
                    </Toolbar>
                </Container>
            </AppBar>
            <div className="body"></div>
            <Container>
                <Outlet />
            </Container>
        </ThemeProvider>
    );
}
