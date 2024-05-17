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

const fetchChartStatusesUI = async () => {
  try {
    const response = await axios.get(`ui/chart_status`);
    return parseStatusesToUsable(response.data);
  } catch (error) {
    console.error(error);
  }
};
const fetchChartStatusesAPI = async () => {
  try {
    const response = await axios.get(`api/chart_status`);

    return parseStatusesToUsable(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchLineChartData = async ({ apiDate, uiDate }) => {
  try {
    const uiResponse = await axios.get(`ui/average_duration`, {
      params: {
        date: uiDate,
      },
    });
    const apiResponse = await axios.get(`api/average_duration`, {
      params: {
        date: apiDate,
      },
    });

    return {
      ui: uiResponse.data.map((element) => ({
        ...element,
        duration: +element.duration.split(":").join("."),
      })),
      api: apiResponse.data.map((element) => ({
        ...element,
        duration: +element.duration.split(":").join("."),
      })),
    };
  } catch (error) {
    console.error(error);
  }
};

export const fetchTodayTestsUI = async (date) => {
  try {
    const response = await axios.get(`ui/today`, {
      params: {
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchTodayTestsAPI = async (date) => {
  try {
    const response = await axios.get(`api/today`, {
      params: {
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchPassedFailedTestsAPI = async () => {
  try {
    const response = await axios.get(`api/passed_failed`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchPassedFailedTestsUI = async () => {
  try {
    const response = await axios.get(`ui/passed_failed`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchChartStatuses = async () => {
  try {
    const api = await fetchChartStatusesAPI();
    const ui = await fetchChartStatusesUI();
    return {
      api: api,
      ui: ui,
    };
  } catch (error) {
    console.error(error);
  }
};

export const fetchPassedFailedTests = async () => {
  try {
    const api = await fetchPassedFailedTestsAPI();
    const ui = await fetchPassedFailedTestsUI();

    return {
      ui: ui,
      api: api,
    };
  } catch (error) {
    console.error(error);
  }
};
