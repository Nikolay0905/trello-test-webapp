import { useCallback, useEffect, useState } from "react";

import Charts from "../../Components/Charts";
import Table from "../../Components/Table";
import TestResponseModal from "../../Components/Modal";

import {
  fetchChartStatuses,
  fetchPassedFailedTests,
  fetchLineChartData,
} from "../../api/dashboard";
import { getAllJobsFromPipeline } from "../../api/pipelines";

import CircularProgress from "@mui/material/CircularProgress";
import { Box, MenuItem, Select, Typography } from "@mui/material";

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    pieData: { ui: [], api: [] },
    barData: { ui: [], api: [] },
    lineData: { ui: [], api: [] },
    pipelineJobs: { ui: [], api: [] },
    averageChartData: { ui: [], api: [] },
  });
  const [showModal, setShowModal] = useState(false);
  const [chosedJobAPI, setChosedJobAPI] = useState("");
  const [chosedJobUI, setChosedJobUI] = useState("");
  const [chosedNameUI, setChosedNameUI] = useState([]);
  const [chosedNameAPI, setChosedNameAPI] = useState([]);
  const [chosedDateAPI, setChosedDateAPI] = useState("");
  const [chosedDateUI, setChosedDateUI] = useState("");

  const handleChangeAndRunTest = useCallback(async (job_id, type) => {
    if (type === "ui") {
      setChosedJobUI(job_id);
    } else if (type === "api") {
      setChosedJobAPI(job_id);
    }
    setShowModal(true);
  }, []);

  const init = useCallback(async () => {
    const pieData = await fetchChartStatuses();
    const allBarData = await fetchPassedFailedTests();
    const data = await getAllJobsFromPipeline();
    const lineChartData = await fetchLineChartData({
      apiDate: chosedDateAPI,
      uiDate: chosedDateUI,
    });

    setChartData({
      pieData: pieData,
      barData: allBarData,
      pipelineJobs: data,
      averageChartData: lineChartData,
    });
  }, [chosedDateAPI, chosedDateUI]);

  useEffect(() => {
    init();
  }, [init]);

  const isLoading =
    chartData.pieData.ui.length === 0 &&
    chartData.pieData.api.length === 0 &&
    chartData.pipelineJobs.ui.length === 0;

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ width: "90%", margin: "20px auto" }}>
            <Typography variant="h2">UI</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Charts
                chosedName={chosedNameUI}
                data={chartData.pieData.ui}
                type="pie"
              />
              <Charts
                chosedName={chosedNameUI}
                setChosedName={setChosedNameUI}
                data={chartData.barData.ui}
                type="bar"
              />
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Table type="ui" length={chosedNameUI.length} />
              <Charts
                chosedName={chosedNameUI}
                setChosedName={setChosedNameUI}
                chosedDate={chosedDateUI}
                setChosedDate={setChosedDateUI}
                data={chartData.averageChartData.ui}
                type="line"
              />
            </Box>
            <Select
              onChange={(e) => handleChangeAndRunTest(e.target.value, "ui")}
              value={chosedJobUI}
              sx={{ width: "50%", margin: "20px auto" }}
              displayEmpty
            >
              <MenuItem value="">
                <em>Choose pipeline to run...</em>
              </MenuItem>
              {chartData.pipelineJobs.ui.map((job) => (
                <MenuItem
                  key={job.id}
                  value={job.id}
                  disabled={chosedJobUI === job.name}
                >
                  {job.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ width: "90%", margin: "20px auto" }}>
            <Typography variant="h2">API</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Charts
                title="API"
                data={chartData.pieData.api}
                chosedName={chosedNameAPI}
                type="pie"
              />
              <Charts
                chosedName={chosedNameAPI}
                setChosedName={setChosedNameAPI}
                chosedDate={chosedDateAPI}
                setChosedDate={setChosedDateAPI}
                data={chartData.barData.api}
                type="bar"
              />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Table type="api" length={chosedNameAPI.length} />
              <Charts
                chosedName={chosedNameAPI}
                setChosedName={setChosedNameAPI}
                chosedDate={chosedDateAPI}
                setChosedDate={setChosedDateAPI}
                data={chartData.averageChartData.api}
                type="line"
              />
            </Box>
            <Select
              onChange={(e) => handleChangeAndRunTest(e.target.value, "api")}
              value={chosedJobAPI}
              labelId="select-label"
              id="simple-select"
              displayEmpty
              sx={{ width: "50%", margin: "20px auto" }}
            >
              <MenuItem value="">
                <em>Choose pipeline to run...</em>
              </MenuItem>
              {chartData.pipelineJobs.api.map((job) => (
                <MenuItem
                  key={job.id}
                  value={job.id}
                  disabled={chosedJobAPI === job.name}
                >
                  {job.name}
                </MenuItem>
              ))}
            </Select>
            <TestResponseModal
              closeModal={() => setShowModal(false)}
              regetVars={init}
              isOpen={showModal}
              job_id={chosedJobAPI === "" ? chosedJobUI : chosedJobAPI}
              type={chosedJobAPI === "" ? "ui" : "api"}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default Dashboard;
