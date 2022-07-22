import { Label } from "./theme";

const themeFn = (element, style1, style2) => {
    for (let i = 0; i < element.length; i++) {
        element[i].classList.add(style1);
        element[i].classList.remove(style2);
    }
};

const web_style = () => {
    const themeBg = document.querySelectorAll(".theme-bg");
    const styleSwitch = document.getElementById("style_switch");

    if (localStorage.getItem("webStyle") == "dark") {
        themeFn(themeBg, "theme-bg-dark", "theme-bg-light");
        styleSwitch.checked = true;
    }
};

const BtnSwitch = (props) => {
    const handleChange = () => {
        const themeBg = document.querySelectorAll(".theme-bg");

        if (localStorage.getItem("webStyle") == "dark") {
            themeFn(themeBg, "theme-bg-light", "theme-bg-dark");
            props.styleChange("light");
        } else {
            themeFn(themeBg, "theme-bg-dark", "theme-bg-light");
            props.styleChange("dark");
        }
    };

    return (
        <form>
            <Label htmlFor="style_switch" className="me-3">
                深色模式
                <input
                    type="checkbox"
                    name="style_switch"
                    id="style_switch"
                    onChange={handleChange}
                />
                <span className="switch ms-3 align-middle">
                    <span className="switch-btn"></span>
                </span>
            </Label>
        </form>
    );
};

export default BtnSwitch;
export { web_style };
