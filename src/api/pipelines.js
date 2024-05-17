import {
  GITLAB_TOKEN,
  GITLAB_URL_API,
  GITLAB_URL_UI,
  PIPELINE_ID_UI,
  PIPELINE_ID_API,
} from "../constants";

const parseJobs = (jobs) => {
  return jobs.filter(
    (job) =>
      (job.name.toLowerCase() !== "build" ||
        job.name.toLowerCase() !== "install_dependencies") && {
        id: job.id,
        name: job.name,
      }
  );
};

export async function getAllJobsFromPipeline() {
  try {
    const UIJobs = await getJobsUI();
    const APIJobs = await getJobsAPI();
    return {
      ui: UIJobs,
      api: APIJobs,
    };
  } catch (error) {
    console.error("Error getting test pipeline jobs:", error);
  }
}

export async function runJob(id, type) {
  try {
    const response = await fetch(
      `${type === "ui" ? GITLAB_URL_UI : GITLAB_URL_API}jobs/${id}/retry`,
      {
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": GITLAB_TOKEN,
        },
        method: "POST",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.id;
    } else {
      console.error("Failed getting test pipeline jobs:", response.statusText);
    }
  } catch (error) {
    console.error("Error running job:", error);
  }
}

async function getJobsAPI() {
  try {
    const response = await fetch(
      `${GITLAB_URL_API}pipelines/${PIPELINE_ID_API}/jobs`,
      {
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": GITLAB_TOKEN,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return parseJobs(data);
    } else {
      console.error("Failed getting test pipeline jobs:", response.statusText);
    }
  } catch (error) {
    console.error("Error getting test pipeline jobs:", error);
  }
}

async function getJobsUI() {
  try {
    const response = await fetch(
      `${GITLAB_URL_UI}pipelines/${PIPELINE_ID_UI}/jobs`,
      {
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": GITLAB_TOKEN,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return parseJobs(data);
    } else {
      console.error("Failed getting test pipeline jobs:", response.statusText);
    }
  } catch (error) {
    console.error("Error getting test pipeline jobs:", error);
  }
}

export async function listenJob(job_id, type) {
  try {
    const response = await fetch(
      `${type === "ui" ? GITLAB_URL_UI : GITLAB_URL_API}jobs/${job_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": GITLAB_TOKEN,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed getting test pipeline jobs:", response.statusText);
    }
  } catch (error) {
    console.error("Error getting test pipeline jobs:", error);
  }
}
