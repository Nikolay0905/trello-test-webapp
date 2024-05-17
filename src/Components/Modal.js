import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { listenJob, runJob } from "../api/pipelines";
import { styled } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ImageStyled = styled(Box)(({ theme }) => ({
  width: "80%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const TestResponseModal = ({ closeModal, isOpen, job_id, type, regetVars }) => {
  const [receiveResponse, setReceiveResponse] = useState(false);
  const [response, setResponse] = useState({
    status: "",
    reason: "",
    start_time: "",
    end_time: "",
  });
  const listenAgain = useCallback(
    async (job_id, type) => {
      if (isOpen) {
        const response = await listenJob(job_id, type);
        if (
          response.status === "running" ||
          response.status.slice(-1) === "g"
        ) {
          setTimeout(() => {
            listenAgain(job_id, type);
          }, 5000);
        } else {
          setReceiveResponse(true);
          setResponse({
            status: response.status,
            reason: response.failure_reason,
            start_time: response.created_at,
            end_time: response.finished_at,
          });
          regetVars();
        }
      }
    },
    [isOpen, regetVars]
  );

  const runTest = useCallback(async () => {
    const response = await runJob(job_id, type);
    return response;
  }, [job_id, type]);

  useEffect(() => {
    if (isOpen) {
      runTest().then((response) => {
        listenAgain(response, type);
      });
    }
  }, [isOpen, job_id, listenAgain, runTest, type]);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setReceiveResponse(false);
        closeModal();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {!receiveResponse ? (
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Test is running ,wait for response
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress />
              <ImageStyled
                component="img"
                src={`${window.location.origin}/images/pic.png`}
                alt=""
              />
            </Box>
          </Box>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Test ended
            </Typography>
            <Typography
              id="modal-modal-description"
              color={response.reason ? "error" : "success"}
              sx={{ mt: 2 }}
            >
              Status: {response.status}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Started at: {new Date(response.start_time).toISOString()}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Ended at: {new Date(response.end_time).toISOString()}
            </Typography>
            {response.reason && response.status === "failed" && (
              <Typography
                id="modal-modal-description"
                color="error"
                sx={{ mt: 2 }}
              >
                Reason : {response.reason}
              </Typography>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TestResponseModal;
