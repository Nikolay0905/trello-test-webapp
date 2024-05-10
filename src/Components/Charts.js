import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  width: 700,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const Charts = ({ data, type }) => {
  if (type === "pie") {
    return (
      <PieChart
        sx={{ mt: 3 }}
        series={[
          {
            data: [...data],
          },
        ]}
        width={600}
        height={300}
      />
    );
  } else if (type === "bar") {
    return (
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "name" }]}
        series={[
          { dataKey: "passed_count", label: "passed" },
          { dataKey: "failed_count", label: "failed" },
        ]}
        {...chartSetting}
      />
    );
  } else {
    return <h1>Return right type !</h1>;
  }
};

export default Charts;
