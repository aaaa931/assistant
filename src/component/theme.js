import styled from "@emotion/styled";

/*
    --props.theme.-bg-light: #ededed;
    --props.theme.-section-light: #f9f9f9;
    --props.theme.-text-light: #828282;
    --props.theme.-bg-dark: #121416;
    --props.theme.-section-dark: #1f2022;
    --props.theme.-text-dark: #ccc;
    --props.theme.-bg-warning: #ffc107;
    --props.theme.-bg-warning-dark: #7e6b04;
    --props.theme.-bg-success: #2cce82;
    --props.theme.-bg-success-dark: #196354;
    --props.theme.-bg-danger: #fa8a93;
    --props.theme.-bg-danger-dark: #dc3545;
*/

const theme = {
    light: {
        bg: "#ededed",
        bgSection: "#ededed",
        color: "#828282",
        bgWarning: "#ffc107",
        bgSuccess: "#2cce82",
        bgDanger: "#fa8a93",
        lowShadow: "0 1px 3px #121416",
        sectionShadow: "3px 2px 4px #121416",
        borderFocus: "5px solid #828282",
    },
    dark: {
        bg: "#121416",
        bgSection: "#1f2022",
        color: "#ccc",
        colorDanger: "#401216",
        bgWarning: "#7e6b04",
        bgSuccess: "#196354",
        bgDanger: "#dc3545",
        lowShadow: "0 1px 3px #ededed",
        sectionShadow: "3px 2px 4px #ededed",
        borderFocus: "5px solid #ccc",
    },
};

const Container = styled.section`
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.color};
`;

const Section = styled.section`
    background-color: ${(props) => props.theme.bgSection};
    color: ${(props) => props.theme.color};
    box-shadow: ${(props) => props.theme.sectionShadow};
`;

const NavContainer = styled.nav`
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.color};
`;

const Text = styled.span`
    color: ${(props) => props.theme.color}!important;
`;

const H2 = styled.h2`
    color: ${(props) => props.theme.color}!important;
    text-align: center;
`;

const Label = styled.label`
    color: ${(props) => props.theme.color};
`;

const TextUrl = styled.span`
    color: ${(props) => props.theme.color}!important;
    text-decoration: none;
`;

const Btn = styled.button`
    background-color: ${(props) => props.theme.bgSection};
    color: ${(props) => props.theme.color};
    &:hover {
        color: ${(props) => props.theme.color};
        border: ${(props) => props.theme.borderFocus};
    }
`;

const BtnWarning = styled.button`
    background-color: ${(props) => props.theme.bgWarning};
    color: ${(props) => props.theme.color};
`;

const BtnSuccess = styled.button`
    background-color: ${(props) => props.theme.bgSuccess};
    color: ${(props) => props.theme.color};
`;

const BtnDanger = styled.button`
    background-color: ${(props) => props.theme.bgDanger};
    color: ${(props) => props.theme.color};
`;

const AlertDanger = styled.section`
    background-color: ${(props) => props.theme.bgDanger};
    color: ${(props) => props.theme.colorDanger};
`;

const Input = styled.input`
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.color};
    box-shadow: ${(props) => props.theme.lowShadow};
    &:focus {
        background-color: ${(props) => props.theme.bg} !important;
        color: ${(props) => props.theme.color} !important;
        border: ${(props) => props.theme.borderFocus};
    }
`;

const Table = styled.table`
    color: ${(props) => props.theme.color};
    box-shadow: ${(props) => props.theme.lowShadow};
`;

export default theme;
export {
    Container,
    Section,
    NavContainer,
    Text,
    H2,
    Label,
    TextUrl,
    Btn,
    BtnWarning,
    BtnSuccess,
    BtnDanger,
    AlertDanger,
    Input,
    Table,
};
