import { useCallback, useEffect, useState } from "react";

import Charts from "../../Components/Charts";
import Table from "../../Components/Table";
import {
  fetchChartStatusesUI,
  fetchChartStatusesAPI,
  fetchTodayTestsUI,
  fetchTodayTestsAPI,
  fetchPassedFailedTestsAPI,
  fetchPassedFailedTestsUI,
} from "../../api/dashboard";

import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  const [uiPieData, setUIPieData] = useState([]);
  const [apiPieData, setAPIPieData] = useState([]);
  const [tableDataUI, setTableDataUI] = useState([]);
  const [tableDataAPI, setTableDataAPI] = useState([]);
  const [barDataAPI, setBarDataAPI] = useState([]);
  const [barDataUI, setBarDataUI] = useState([]);

  const init = useCallback(() => {
    fetchChartStatusesUI().then((data) => {
      setUIPieData(data);
    });
    fetchChartStatusesAPI().then((data) => {
      setAPIPieData(data);
    });

    fetchTodayTestsUI().then((data) => {
      setTableDataUI(data);
    });
    fetchTodayTestsAPI().then((data) => {
      setTableDataAPI(data);
    });

    fetchPassedFailedTestsAPI().then((data) => {
      setBarDataAPI(data);
    });
    fetchPassedFailedTestsUI().then((data) => {
      setBarDataUI(data);
    });
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const isLoading = uiPieData.length === 0 && apiPieData.length === 0;

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ width: "90%", margin: "20px auto" }}>
            <Typography variant="h2">UI</Typography>
            <Box sx={{ display: "flex" }}>
              <Charts data={uiPieData} type="pie" />
              <Charts data={barDataUI} type="bar" />
            </Box>
            <Table rows={tableDataUI} />
          </Box>
          <Box sx={{ width: "90%", margin: "20px auto" }}>
            <Typography variant="h2">API</Typography>
            <Box sx={{ display: "flex" }}>
              <Charts title="API" data={apiPieData} type="pie" />
              <Charts data={barDataAPI} type="bar" />
            </Box>
            <Table rows={tableDataAPI} />
          </Box>
        </>
      )}
    </div>
  );
};

export default Dashboard;
