import React, { useState } from "react";
// import { Container, Btn } from "./component/theme";
import ReactTable from "./component/table";
import DataList, { ErrorMsg, Submit, Title } from "./component/form";
// import { H2 } from "./component/theme";
import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
    IconButton,
    Menu,
    Tooltip,
    MenuItem,
    Switch,
    FormGroup,
    FormControl,
    FormControlLabel,
    CssBaseline,
    Grid,
    TextField,
    Alert,
} from "@mui/material";
import api from "./api";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
    fetchItem,
    selectItemData,
    selectItemType,
    selectItemId,
    selectItemName,
    setItemName,
    setItemData,
    setItemType,
    setItemId,
} from "./itemSlice";
import { useEffect } from "react";

const Item = (props) => {
    // const [type, setType] = useState("");
    // const [id, setId] = useState("");
    // const [name, setName] = useState("");
    // const rawData =
    //     JSON.parse(localStorage.getItem("itemData")).length > 0
    //         ? JSON.parse(localStorage.getItem("itemData"))
    //         : [{ itemType: "暫無資料" }];
    // const [data, setData] = useState(rawData);
    const itemData = useSelector(selectItemData);
    const itemType = useSelector(selectItemType);
    const itemId = useSelector(selectItemId);
    const itemName = useSelector(selectItemName);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(false);
    /*const [data, setData] = useState(
        JSON.parse(localStorage.getItem("itemData"))
    );*/
    // const refAlert = useRef("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        async function init() {
            await dispatch(fetchItem());
        }

        init();
    });

    // get unique itemType
    let typeData = [Object.keys(itemData).length];
    typeData = itemData.map((item) => item.itemType);
    typeData = [...new Set(typeData)];

    // let typeData = [Object.keys(data).length];
    // typeData = data.map((item) => item.itemType);
    // typeData = [...new Set(typeData)];

    // const typeList =
    //     typeData[0] != "暫無資料"
    //         ? typeData.map((item) => <option value={item} key={item}></option>)
    //         : "";

    // const idList = data.map((item) => (
    //     <option value={item.itemId} key={item.itemId}></option>
    // ));

    // const nameList = data.map((item) => (
    //     <option value={item.itemName} key={item.itemId}></option>
    // ));

    // const typeList = typeData[0] != "暫無資料" ? typeData : [];
    // const idList =
    //     data[0].itemId != "暫無資料" ? data.map((item) => item.id) : [];
    // const nameList =
    //     data[0].itemId != "暫無資料" ? data.map((item) => item.itemName) : [];
    const typeList = typeData ? typeData : [];
    const idList = itemData ? itemData.map((item) => item.itemId) : [];
    const nameList = itemData ? itemData.map((item) => item.itemName) : [];

    const alert_check = () => {
        if (alert === true) {
            setAlert(false);
        }
    };

    const handleType = (e) => {
        // if (alert.current.style.display == "block") {
        //     alert.current.style.display = "none";
        // }
        alert_check();
        // setType(e.target.value);
        dispatch(setItemType(e.target.value));
        console.log("itemType :>> ", itemType);
    };

    const handleId = (e) => {
        // if (alert.style.display == "block") {
        //     alert.style.display = "none";
        // }
        alert_check();
        // setId(e.target.value);
        dispatch(setItemId(e.target.value));
        console.log("itemId :>> ", itemId);
    };

    const handleName = (e) => {
        // if (alert.current.style.display == "block") {
        //     alert.current.style.display = "none";
        // }
        alert_check();
        // setName(e.target.value);
        dispatch(setItemName(e.target.value));
        console.log("itemName :>> ", itemName);
    };

    async function addItem(name) {
        const newData = {
            itemType: itemType,
            itemId: itemId,
            itemName: itemName,
        };

        await api("item", "post", newData);
        await dispatch(fetchItem());
    }

    const handleItemSubmit = (e) => {
        e.preventDefault();
        console.log("item submit :>> ");

        // if (type === "" || id === "" || name === "") {
        //     setMsg("輸入項目有缺少，請確認所有欄位都輸入完畢");
        //     alert.current.style.display = "block";
        //     return;
        // }

        // if (type === "暫無資料" || id === "暫無資料" || name === "暫無資料") {
        //     setMsg("請不要輸入系統預設的資料");
        //     alert.current.style.display = "block";
        //     alert = true;
        //     setAlert(true);
        //     return;
        // }

        // if (data.filter((item, i) => data[i].itemId === id).length > 0) {
        //     alert.current.style.display = "block";
        //     setMsg("項目編碼是唯一值，請不要輸入重複的項目編碼");
        //     setAlert(true);
        //     return;
        // }
        if (itemData.filter((item, i) => item.itemId === itemId).length > 0) {
            setMsg("項目編碼是唯一值，請不要輸入重複的項目編碼");
            setAlert(true);
            return;
        }

        // const newData = {
        //     itemType: type,
        //     itemId: id,
        //     itemName: name,
        // };

        // if (data[0].itemType === "暫無資料") {
        //     data.splice(0, 1);
        // }

        // setData([...data, newData]);
        // data.push(newData);
        // localStorage.setItem("itemData", JSON.stringify(data));
        addItem();
    };
    console.log("typeList :>> ", typeList);
    console.log("idList :>> ", idList);
    console.log("nameList :>> ", nameList);
    return (
        // <Container className="container">
        //     <form className="form row mb-5" onSubmit={handleItemSubmit}>
        //         <H2>新增項目</H2>
        //         <DataList
        //             text="項目類別"
        //             placeholder="請輸入 8 個字以下"
        //             minLength="1"
        //             maxLength="8"
        //             id="itemType"
        //             option={typeList}
        //             onChange={handleType}
        //         ></DataList>
        //         <DataList
        //             text="項目編碼"
        //             placeholder="請輸入 4 個字以下，不可重複"
        //             minLength="1"
        //             maxLength="4"
        //             id="itemId"
        //             option={idList}
        //             onChange={handleId}
        //         ></DataList>
        //         <DataList
        //             text="項目名稱"
        //             placeholder="請輸入 8 個字以下"
        //             minLength="1"
        //             maxLength="8"
        //             id="itemName"
        //             option={nameList}
        //             onChange={handleName}
        //         ></DataList>
        //         <Container className="px-3">
        //             <Btn className="btn w-100 w-lg-50">新增</Btn>
        //         </Container>
        //         <Container className="px-3 pt-3">
        //             <section
        //                 className="alert alert-danger display-none"
        //                 id="alert"
        //                 ref={refAlert}
        //             >
        //                 {msg}
        //             </section>
        //         </Container>
        //     </form>
        //     <Container className="row">
        //         <H2>項目表</H2>
        //         <ReactTable
        //             data={data}
        //             col={JSON.parse(localStorage.getItem("itemCol"))}
        //         ></ReactTable>
        //     </Container>
        // </Container>
        <Box>
            <form onSubmit={handleItemSubmit}>
                <Title text="新增項目" />
                <Stack direction="row" spacing={2} mb={3}>
                    <DataList
                        text="項目類別"
                        options={typeList}
                        onChange={handleType}
                    ></DataList>
                    <DataList
                        text="項目編碼"
                        options={idList}
                        onChange={handleId}
                    ></DataList>
                </Stack>
                <Stack direction="row" spacing={2} mb={3}>
                    <DataList
                        text="項目名稱"
                        options={nameList}
                        onChange={handleName}
                    ></DataList>
                </Stack>
                <Submit />
                <ErrorMsg alert={alert} msg={msg} />
            </form>
            <Box>
                <Title text="項目表" />
                <ReactTable
                    // data={data}
                    // col={JSON.parse(localStorage.getItem("itemCol"))}
                    data={itemData ? itemData : []}
                    col={[]}
                ></ReactTable>
            </Box>
        </Box>
    );
};

export default Item;
