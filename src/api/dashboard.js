import axios from "axios";

const parseStatusesToUsable = (statuses) => {
  const data = Object.keys(statuses).map((key, index) => {
    return {
      id: index,
      value: statuses[key],
      label: key,
    };
  });
  return data;
};

export const fetchChartStatusesUI = async () => {
  try {
    const response = await axios.get(`ui/chart_status`);
    return parseStatusesToUsable(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchChartStatusesAPI = async () => {
  try {
    const response = await axios.get(`api/chart_status`);

    return parseStatusesToUsable(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchTodayTestsUI = async () => {
  try {
    const response = await axios.get(`ui/today`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchTodayTestsAPI = async () => {
  try {
    const response = await axios.get(`api/today`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPassedFailedTestsAPI = async () => {
  try {
    const response = await axios.get(`api/passed_failed`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPassedFailedTestsUI = async () => {
  try {
    const response = await axios.get(`ui/passed_failed`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
