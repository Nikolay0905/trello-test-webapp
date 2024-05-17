import moment from "moment";

import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useTheme } from "@mui/material/styles";

const Charts = ({
  data,
  type,
  chosedName,
  setChosedName,
  chosedDate,
  setChosedDate,
}) => {
  const theme = useTheme();
  const chartColors = [
    theme.palette.pass,
    theme.palette.fail,
    theme.palette.interrupt,
    theme.palette.timeout,
    theme.palette.cancel,
  ];

  if (type === "pie") {
    return (
      <Box sx={{ width: chosedName.length > 3 ? "100%" : "50%" }}>
        <PieChart
          sx={{
            margin: "30px 0",
            width:
              chosedName.length > 3
                ? { sx: "80%", md: "40%" }
                : { md: "40%", sx: "80%" },
          }}
          height={450}
          colors={chartColors}
          series={[
            {
              data: [...data],
            },
          ]}
        />
      </Box>
    );
  } else if (type === "bar") {
    const SelectInput = (
      <FormControl sx={{ width: "80%", ml: 4 }}>
        <InputLabel id="multiple-checkbox-label">Choose tests</InputLabel>
        <Select
          onChange={(e) => {
            const {
              target: { value },
            } = e;
            setChosedName(typeof value === "string" ? value.split(",") : value);
          }}
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          value={chosedName}
          displayEmpty
          multiple
          renderValue={(selected) => selected.join(", ")}
        >
          <MenuItem value="">
            <em>Choose test...</em>
          </MenuItem>
          {data.map((job, index) => (
            <MenuItem key={index} value={job.name}>
              {job.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
    return (
      <Box sx={{ width: chosedName.length > 3 ? "100%" : "50%" }}>
        {SelectInput}
        <BarChart
          colors={chartColors}
          dataset={
            chosedName.length > 0
              ? data.filter((chartData) => chosedName.includes(chartData.name))
              : data.slice(0, 3)
          }
          xAxis={[{ scaleType: "band", dataKey: "name" }]}
          series={[
            { dataKey: "passed_count", label: "passed" },
            { dataKey: "failed_count", label: "failed" },
          ]}
          sx={{
            width:
              chosedName.length > 3
                ? { sx: "80%", md: "40%" }
                : { md: "40%", sx: "80%" },
          }}
          height={chosedName.length > 3 ? 600 : 450}
        />
      </Box>
    );
  } else if (type === "line") {
    let menuItems = [];
    let series = [];
    let dataToShow = [];

    data.forEach((element) => {
      if (menuItems.indexOf(element.name) === -1) {
        menuItems.push(element.name);
      }
    });

    const SelectInput = (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FormControl sx={{ width: "40%", marginLeft: "20px" }}>
          <InputLabel id="multiple-checkbox-label">Choose tests</InputLabel>
          <Select
            onChange={(e) => {
              const {
                target: { value },
              } = e;
              const newValue =
                value !== ""
                  ? typeof value === "string"
                    ? value.split(",")
                    : value
                  : [];
              setChosedName(newValue);
            }}
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            value={chosedName}
            displayEmpty
            multiple
            renderValue={(selected) => selected.join(", ")}
          >
            <MenuItem value="">
              <em>Choose test...</em>
            </MenuItem>
            {menuItems.map((job, index) => (
              <MenuItem key={index} value={job}>
                {job}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "40%", marginLeft: "20px" }}>
          <DatePicker
            onChange={(e) => setChosedDate(moment(e).format("YYYY-MM-DD"))}
            value={moment(chosedDate)}
            maxDate={moment()}
          />
        </FormControl>
      </LocalizationProvider>
    );

    if (chosedName.length > 0) {
      dataToShow = [];
      series = [];
      chosedName.forEach((chosedNM) => {
        data
          .sort((a, b) => {
            const dateA = moment(a.date, "YYYY-MM-DD");
            const dateB = moment(b.date, "YYYY-MM-DD");

            if (dateA.isBefore(dateB)) {
              return -1;
            }
            if (dateA.isAfter(dateB)) {
              return 1;
            }
            return 0;
          })
          .forEach((element) => {
            const index = series.find(
              (serie) => serie.dataKey === element.name
            );

            if (element.name === chosedNM) {
              dataToShow.push({
                date: element.date,
                [element.name]: element.duration,
              });
            }
            if (!index && element.name === chosedNM) {
              series.push({
                dataKey: element.name,
                label: `${element.name} (минути)`,
              });
            }
          });
      });
    } else {
      data.slice(0, 5).forEach((element) => {
        const index = series.find((serie) => serie.dataKey === element.name);
        dataToShow.push({
          date: element.date,
          [element.name]: element.duration,
        });
        if (!index) {
          series.push({
            dataKey: element.name,
            label: `${element.name} (минути)`,
          });
        }
      });
    }

    return (
      <Box sx={{ width: series.length > 3 ? "100%" : "50%", mt: 3 }}>
        {SelectInput}
        <LineChart
          colors={chartColors}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "date",
              valueFormatter: (value) => moment(value).format("YYYY-MM-DD"),
            },
          ]}
          series={series}
          dataset={dataToShow}
          sx={{
            mt: 4,
            width:
              series.length > 3
                ? { sx: "80%", md: "40%" }
                : { md: "40%", sx: "80%" },
          }}
          height={series.length > 3 ? 600 : 450}
        />
      </Box>
    );
  } else {
    return <h1>Return right type !</h1>;
  }
};

export default Charts;
