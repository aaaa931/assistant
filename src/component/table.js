import React, { useMemo, useState } from "react";
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
    const [sort, setSort] = useState("asc");
    const [sortBy, setSortBy] = useState("id");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

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

    return (
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
