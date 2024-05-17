import { useState, useCallback, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { fetchTodayTestsAPI, fetchTodayTestsUI } from "../api/dashboard";
import { parseTime } from "../utils";
import moment from "moment";

const currentDay = moment().format("YYYY-MM-DD");

const TestsTable = ({ type, length }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [chosedDate, setChosedDate] = useState(currentDay);
  const [data, setData] = useState([]);

  const getTableData = useCallback(async () => {
    let todayTests = [];
    if (type === "api") {
      todayTests = await fetchTodayTestsAPI(chosedDate);
    } else if (type === "ui") {
      todayTests = await fetchTodayTestsUI(chosedDate);
    }

    setData(todayTests);
  }, [chosedDate, type]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TableContainer
        sx={{ width: length > 3 ? "100%" : "40%" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow align="center">
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">
                <DatePicker
                  onChange={(e) =>
                    setChosedDate(moment(e).format("YYYY-MM-DD"))
                  }
                  value={moment(chosedDate)}
                  maxDate={moment(currentDay)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    {row.status.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">{parseTime(row.date)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </LocalizationProvider>
  );
};

export default TestsTable;
