import React, { useState } from "react";
import ReactTable from "./component/table";
import DataList, { ErrorMsg, Submit, Title } from "./component/form";
import { Box, Stack } from "@mui/material";
import api from "./api";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
    fetchItem,
    selectItemData,
    selectItemType,
    selectItemId,
    selectItemName,
    setItemName,
    setItemType,
    setItemId,
} from "./itemSlice";
import { useEffect } from "react";

const Item = (props) => {
    const itemData = useSelector(selectItemData);
    const itemType = useSelector(selectItemType);
    const itemId = useSelector(selectItemId);
    const itemName = useSelector(selectItemName);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(false);
    const [msg, setMsg] = useState("");
    const colList = [
        { id: "itemId", label: "項目編號" },
        { id: "itemName", label: "項目名稱" },
        { id: "itemType", label: "項目類別" },
    ];

    useEffect(() => {
        async function init() {
            await dispatch(fetchItem());
        }

        init();
    }, []);

    // get unique itemType
    console.log("itemData :>> ", itemData);
    console.log(
        "itemData.map((item) => item) :>> ",
        itemData.map((item) => item)
    );
    let typeData = [Object.keys(itemData).length];
    typeData = itemData.map((item) => item.itemType);
    typeData = [...new Set(typeData)];

    const typeList = typeData ? typeData : [];
    const idList = itemData ? itemData.map((item) => item.itemId) : [];
    const nameList = itemData ? itemData.map((item) => item.itemName) : [];

    const alert_check = () => {
        if (alert === true) {
            setAlert(false);
        }
    };

    const handleType = (e) => {
        alert_check();
        dispatch(setItemType(e.target.value));
        console.log("itemType :>> ", itemType);
    };

    const handleId = (e) => {
        alert_check();
        dispatch(setItemId(e.target.value));
        console.log("itemId :>> ", itemId);
    };

    const handleName = (e) => {
        alert_check();
        dispatch(setItemName(e.target.value));
        console.log("itemName :>> ", itemName);
    };

    async function addItem() {
        const newData = {
            itemId: itemId,
            itemName: itemName,
            itemType: itemType,
        };

        await api("item", "post", newData);
        await dispatch(fetchItem());
    }

    const handleItemSubmit = (e) => {
        e.preventDefault();
        console.log("item submit :>> ");

        if (itemData.filter((item, i) => item.itemId === itemId).length > 0) {
            setMsg("項目編碼是唯一值，請不要輸入重複的項目編碼");
            setAlert(true);
            return;
        }

        addItem();
    };
    console.log("typeList :>> ", typeList);
    console.log("idList :>> ", idList);
    console.log("nameList :>> ", nameList);
    return (
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
                    data={itemData ? itemData : []}
                    col={colList}
                ></ReactTable>
            </Box>
        </Box>
    );
};

export default Item;
