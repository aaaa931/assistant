import React, { useState, useEffect } from "react";
import ReactTable from "./component/table";
import DataList, { InputN, Submit, ErrorMsg, Title } from "./component/form";
import { Box, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchAccounting,
    selectAccountingData,
    selectAccountingId,
    selectAccountingPrice,
    selectAccountingTotal,
    setAccountingId,
    setAccountingPrice,
    setAccountingTotal,
} from "./accountingSlice";
import { fetchItem, selectItemData } from "./itemSlice";
import api from "./api";

const Accounting = (props) => {
    const itemData = useSelector(selectItemData);
    const accountingData = useSelector(selectAccountingData);
    const accountingId = useSelector(selectAccountingId);
    const accountingPrice = useSelector(selectAccountingPrice);
    const accountingTotal = useSelector(selectAccountingTotal);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(false);
    const [msg, setMsg] = useState("");
    const colList = [
        { id: "accountingId", label: "項目編號" },
        { id: "accountingName", label: "項目名稱" },
        { id: "accountingPrice", label: "記帳金額" },
        { id: "accountingDate", label: "記帳日期" },
    ];
    // YYYY-MM-DD
    const today = new Date().toISOString().substring(0, 10);
    // YYYY-MM
    const month = today.substring(0, 7);
    const filter = {
        accountingDate: month,
    };

    useEffect(() => {
        async function init() {
            await dispatch(fetchAccounting(filter));
            await dispatch(fetchItem());
        }

        init();
    }, []);

    useEffect(() => {
        const init_price = () => {
            let priceAll = 0;

            accountingData.map((acc) => {
                const accPrice = acc.accountingPrice;
                const price = isNaN(accPrice) ? 0 : parseInt(accPrice);
                priceAll = priceAll + price;
                return price;
            });

            dispatch(setAccountingTotal(priceAll));
        };

        init_price();
    }, [accountingData]);

    const idList = itemData ? itemData.map((item) => item.itemId) : [];

    const alert_check = () => {
        if (alert === true) {
            setAlert(false);
        }
    };

    const handleId = (e, val) => {
        alert_check();
        dispatch(setAccountingId(val));
    };

    const handlePrice = (e) => {
        alert_check();
        dispatch(setAccountingPrice(e.target.value));
    };

    async function addAccounting(itemFilter) {
        const name = itemFilter.itemName;

        const newData = {
            accountingId: accountingId,
            accountingName: name,
            accountingPrice: accountingPrice,
            accountingDate: today,
        };

        dispatch(
            setAccountingTotal(accountingTotal + parseInt(accountingPrice))
        );
        await api("accounting", "post", newData);
        await dispatch(fetchAccounting(filter));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const itemFilter = itemData.find(
            (item) => item.itemId === accountingId
        );

        console.log("itemData :>> ", itemData);
        console.log("itemData[0].itemId :>> ", itemData[0].itemId);
        console.log("accountingId :>> ", accountingId);
        console.log("itemFilter :>> ", itemFilter);

        if (itemFilter.length < 1) {
            setMsg("請確認輸入的編號為已經登記在項目表上的編號");
            setAlert(true);
            return;
        }

        addAccounting(itemFilter);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Title text="新增記帳" />
                <Stack direction="row" spacing={2} mb={3}>
                    <DataList
                        text="項目編碼"
                        options={idList}
                        onChange={handleId}
                        maxLength={8}
                    ></DataList>
                    <InputN
                        text="項目金額"
                        onChange={handlePrice}
                        min={-100000}
                        max={100000}
                    ></InputN>
                </Stack>
                <Submit />
                <ErrorMsg alert={alert} msg={msg} />
            </form>
            <Box>
                <Title text={month + " 月記帳表"} />
                <ReactTable data={accountingData} col={colList}></ReactTable>
                <Box mb={5}>
                    <Typography variant="h3" textAlign={"right"}>
                        總金額：{accountingTotal}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Accounting;
