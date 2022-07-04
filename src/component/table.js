import React, { useMemo, useState } from "react";
// import { useTable } from "react-table";
// import { useSortBy } from "react-table/dist/react-table.development";
// import { Table, Text } from "./theme";
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
    TextField,
    Autocomplete,
    CssBaseline,
    Alert,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
} from "@mui/material";

const sort_desc = (a, b, sortBy) => {
    if (a[sortBy] > b[sortBy]) {
        return -1;
    } else if (a[sortBy] < b[sortBy]) {
        return 1;
    }

    return 0;
};

const getSort = (sort, sortBy) => {
    return sort === "desc"
        ? (a, b) => sort_desc(a, b, sortBy)
        : (a, b) => -sort_desc(a, b, sortBy);
};

const ColList = (props) => {
    const columns = [
        { id: "itemId", label: "項目編號", numeric: false },
        { id: "itemName", label: "項目名稱", numeric: false },
        { id: "itemType", label: "項目類別", numeric: false },
    ];

    const { sortBy, sort } = props;

    const handleSortCreate = (property) => (e) => {
        props.onSort(e, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((col) => (
                    <TableCell
                        align={col.numeric ? "right" : "left"}
                        key={col.id}
                        sortDirection={sortBy === col.id ? sort : false}
                    >
                        <TableSortLabel
                            active={sortBy === col.id}
                            direction={sortBy === col.id ? sort : "asc"}
                            onClick={handleSortCreate(col.id)}
                        >
                            {col.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const ReactTable = (props) => {
    // const tableRow = props.data.length > 0 ? props.data : ["暫無資料"];
    // const data = useMemo(() => tableRow, [props.data]);
    // const columns = useMemo(() => props.col, [props.col]);
    const [sort, setSort] = useState("asc");
    const [sortBy, setSortBy] = useState("itemId");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    // const rows = props.data.length > 0 ? props.data : ["暫無資料"];

    // const colList = columns.map((col) => (
    //         <TableCell align={col.numeric ? "right" : "left"} key={col.id}>
    //             {col.label}
    //         </TableCell>
    // ));

    const rows = [
        { itemId: "F001", itemName: "蘋果", itemType: "食物" },
        { itemId: "F001", itemName: "蘋果", itemType: "食物" },
        { itemId: "F001", itemName: "蘋果", itemType: "食物" },
        { itemId: "F001", itemName: "蘋果", itemType: "食物" },
        { itemId: "F001", itemName: "蘋果", itemType: "食物" },
        { itemId: "F001", itemName: "蘋果", itemType: "食物" },
    ];

    const handleSort = (e, property) => {
        const isAsc = sortBy === property && sort === "asc";

        setSort(isAsc ? "desc" : "asc");
        setSortBy(property);
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    //     useTable({ columns, data }, useSortBy);

    return (
        // <section className="table-responsive">
        //     <Table {...getTableProps()} className="table">
        //         <thead className="text-center">
        //             {headerGroups.map((headerGroup) => (
        //                 <tr {...headerGroup.getHeaderGroupProps()}>
        //                     {headerGroup.headers.map((column) => (
        //                         <th
        //                             {...column.getHeaderProps(
        //                                 column.getSortByToggleProps()
        //                             )}
        //                         >
        //                             {column.render("Header")}
        //                             <Text>
        //                                 {column.isSorted
        //                                     ? column.isSortedDesc
        //                                         ? " ⇊"
        //                                         : " ⇈"
        //                                     : ""}
        //                             </Text>
        //                         </th>
        //                     ))}
        //                 </tr>
        //             ))}
        //         </thead>
        //         <tbody {...getTableBodyProps()}>
        //             {(rows[0].original != "暫無資料") &
        //             (rows[0].original.itemType != "暫無資料") ? (
        //                 rows.map((row) => {
        //                     prepareRow(row);
        //                     return (
        //                         <tr
        //                             {...row.getRowProps()}
        //                             className="text-center"
        //                         >
        //                             {row.cells.map((cell) => {
        //                                 return (
        //                                     <td {...cell.getCellProps()}>
        //                                         {cell.render("Cell")}
        //                                     </td>
        //                                 );
        //                             })}
        //                         </tr>
        //                     );
        //                 })
        //             ) : (
        //                 <tr>
        //                     <td colSpan="4" className="text-center">
        //                         暫無資料
        //                     </td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </Table>
        // </section>
        <Box>
            <TableContainer>
                <Table>
                    <ColList sort={sort} sortBy={sortBy} onSort={handleSort} />
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .sort(getSort(sort, sortBy))
                            .map((row) => (
                                <TableRow hover tabIndex={-1} key={row.itemId}>
                                    <TableCell align="left">
                                        {row.itemId}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.itemName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.itemType}
                                    </TableCell>
                                </TableRow>
                            ))}
                        {/* {emptyRows > 0 && (
                            <TableRow>
                                <TableCell colspan={3}></TableCell>
                            </TableRow>
                        )} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ alignItems: "center" }}
            ></TablePagination>
        </Box>
    );
};

export default ReactTable;
