import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const BoxStyled = styled(Box)(({ theme }) => ({
  width: "40%",
  display: "flex",
  padding: 20,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    width: "100%",
  },
  justifyContent: "center",
  color: theme.palette.secondary.white,
  flexDirection: "column",
}));

const ImageStyled = styled(Box)(({ theme }) => ({
  width: "40%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Carousel = () => {
  return (
    <Box
      display="flex"
      sx={{
        flexWrap: "wrap",
        justifyContent: "space-around",
        width: "100%",
        height: { md: "100vh", xs: "100%" },
      }}
      bgcolor="primary.main"
    >
      <BoxStyled>
        <Typography variant="h2">Moments.</Typography>
        <Typography variant="h2">Move Your Project.</Typography>
        <Typography variant="body2" sx={{ mt: 4 }}>
          Unlock the power of seamless testing and application management with
          our platform. From running comprehensive tests to visualizing insights
          through intuitive charts, we've got you covered. Elevate your testing
          experience and streamline your application management process
          effortlessly with us.
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: { xs: "55%", md: "40%" },
            margin: { xs: "20px auto", md: "20px 0 0 0" },
          }}
          color="secondary"
        >
          <Link
            style={{
              width: "100%",
              height: "100%",
              textDecoration: "none",
              color: "white",
            }}
            to="dashboard"
          >
            Launch
          </Link>
        </Button>
      </BoxStyled>
      <ImageStyled
        component="img"
        src={`${window.location.origin}/images/carousel_image.png`}
        alt=""
      />
    </Box>
  );
};

export default Carousel;
