import React from "react";
// import { Container, H2 } from "./component/theme";
import { Title } from "./component/form";
import ReactTable from "./component/table";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounting, selectAccountingData } from "./accountingSlice";
import { useEffect } from "react";

const Record = (props) => {
    // let rawAccountingData;

    // if (JSON.parse(localStorage.getItem("accountingData")).length > 0) {
    //     rawAccountingData = JSON.parse(localStorage.getItem("accountingData"));
    // } else {
    //     rawAccountingData = ["暫無資料"];
    // }
    const accountingData = useSelector(selectAccountingData);
    const dispatch = useDispatch();
    const colList = [
        { id: "accountingId", label: "項目編號" },
        { id: "accountingName", label: "項目名稱" },
        { id: "accountingPrice", label: "記帳金額" },
        { id: "accountingDate", label: "記帳日期" },
    ];

    useEffect(() => {
        const init = async () => {
            await dispatch(fetchAccounting());
        };

        init();
    }, []);

    return (
        // <Container className="container">
        //     <Container className="row">
        //         <H2>過往紀錄</H2>
        //         <ReactTable
        //             data={rawAccountingData}
        //             col={JSON.parse(localStorage.getItem("accountingCol"))}
        //         ></ReactTable>
        //     </Container>
        // </Container>
        <Box>
            <Title text="過往紀錄" />
            <ReactTable data={accountingData} col={colList}></ReactTable>
        </Box>
    );
};

export default Record;
