import React from "react";
// import { Container, H2 } from "./component/theme";
import { Title } from "./component/form";
import ReactTable from "./component/table";
import { Box } from "@mui/material";

const Record = (props) => {
    let rawAccountingData;

    if (JSON.parse(localStorage.getItem("accountingData")).length > 0) {
        rawAccountingData = JSON.parse(localStorage.getItem("accountingData"));
    } else {
        rawAccountingData = ["暫無資料"];
    }

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
            <ReactTable
                data={rawAccountingData}
                col={JSON.parse(localStorage.getItem("accountingCol"))}
            ></ReactTable>
        </Box>
    );
};

export default Record;
