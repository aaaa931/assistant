import React, { useMemo, useState } from "react";
// import { useTable } from "react-table";
// import { useSortBy } from "react-table/dist/react-table.development";
// import { Table, Text } from "./theme";
import {
    Box,
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
    // if (a[sortBy] > b[sortBy]) {
    //     return -1;
    // } else if (a[sortBy] < b[sortBy]) {
    //     return 1;
    // }

    // return 0;

    const x = a[sortBy].toString();
    const y = b[sortBy].toString();

    console.log("a[sortBy] :>> ", x);
    console.log("b[sortBy] :>> ", y);
    return -x.localeCompare(y, "zh-hant");
};

const getSort = (sort, sortBy) => {
    return sort === "desc"
        ? (a, b) => sort_desc(a, b, sortBy)
        : (a, b) => -sort_desc(a, b, sortBy);
};

const ColList = (props) => {
    const { columns, sortBy, sort } = props;

    const handleSortCreate = (property) => (e) => {
        props.onSort(e, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.length > 0 ? (
                    columns.map((col) => (
                        <TableCell
                            align={"center"}
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
                    ))
                ) : (
                    <TableCell align={"center"} key={"no col"}>
                        資料異常
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

const RowList = (props) => {
    const { rows, page, rowsPerPage, sort, sortBy, colCount } = props;
    console.log("rows :>> ", rows);

    return rows.length > 0 ? (
        rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .sort(getSort(sort, sortBy))
            .map((row) => {
                return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                        {Object.entries(row).map((cell) => {
                            if (cell[0] !== "id") {
                                return (
                                    <TableCell align="center" key={cell[1]}>
                                        {cell[1]}
                                    </TableCell>
                                );
                            }
                        })}
                    </TableRow>
                );
            })
    ) : (
        <TableRow hover tabIndex={-1} key="no data">
            <TableCell align="center" colSpan={colCount}>
                暫無資料
            </TableCell>
        </TableRow>
    );
};

const ReactTable = (props) => {
    // const tableRow = props.data.length > 0 ? props.data : ["暫無資料"];
    // const data = useMemo(() => tableRow, [props.data]);
    // const columns = useMemo(() => props.col, [props.col]);
    const [sort, setSort] = useState("asc");
    const [sortBy, setSortBy] = useState("id");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    // const columns = [
    //     { id: "itemId", label: "項目編號" },
    //     { id: "itemName", label: "項目名稱" },
    //     { id: "itemType", label: "項目類別" },
    // ];

    // const rows = [
    //     { itemId: "F001", itemName: "蘋果", itemType: "食物" },
    //     { itemId: "F002", itemName: "香蕉", itemType: "食物" },
    //     { itemId: "M001", itemName: "水電費", itemType: "月支出" },
    //     { itemId: "M002", itemName: "通勤費", itemType: "月支出" },
    //     { itemId: "O001", itemName: "交際費", itemType: "其他支出" },
    //     { itemId: "O002", itemName: "設備費", itemType: "其他支出" },
    // ];

    const columns = useMemo(() => (props.col.length > 0 ? props.col : []));
    const rows = useMemo(() => (props.data.length > 0 ? props.data : []));
    const colCount = columns.length > 0 ? Object.keys(columns).length : 1;

    console.log("rows :>> ", rows);
    console.log("colCount :>> ", colCount);
    console.log("columns :>> ", columns);

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
                    <ColList
                        sort={sort}
                        sortBy={sortBy}
                        onSort={handleSort}
                        columns={columns}
                    />
                    <TableBody>
                        <RowList
                            rows={rows}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            sort={sort}
                            sortBy={sortBy}
                            colCount={colCount}
                        />
                        {/* {rows.length > 0 ? (
                            rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .sort(getSort(sort, sortBy))
                                .map((row) => (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.itemId}
                                    >
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
                                ))
                        ) : (
                            <TableRow hover tabIndex={-1} key="no data">
                                <TableCell align="center" colSpan={colCount}>
                                    暫無資料
                                </TableCell>
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
