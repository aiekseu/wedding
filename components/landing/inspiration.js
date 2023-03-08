import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { LANDING_REFS } from "../../utils/consts";

const InspirationSection = () => {
  return (
    <Container
      maxWidth={"lg"}
      ref={LANDING_REFS.INSPIRATION}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant={"h2"}>Помощь и вдохновение</Typography>
    </Container>
  );
};

export default InspirationSection;
