// import { ThemeProvider } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
    createTheme,
    ThemeProvider,
    alpha,
    styled,
} from "@mui/material/styles";
import { themeFn, getTheme } from "./theme";
import {
    Button,
    Container,
    Stack,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Switch,
    CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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

export default function Nav(props) {
    const [style, setStyle] = useState(localStorage.getItem("webStyle"));

    const styleChange = () => {
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

    const theme = createTheme(getTheme(style));

    return (
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
