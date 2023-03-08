import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { ASSETS_URL, LANDING_REFS } from "../../utils/consts";
import Image from "next/image";

const WhereAndWhenSection = () => {
  return (
    <Container
      maxWidth={"lg"}
      ref={LANDING_REFS.WHERE_AND_WHEN}
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "column",
        pt: 4,
      }}
    >
      <Typography
        sx={{
          backgroundImage: `url(${ASSETS_URL}bering.jpg)`,
          backgroundClip: "text",
          color: "transparent",
          backgroundPosition: "center 60%",
          backgroundSize: "90%",
          fontSize: "10vw",
          maxLines: 1,
          fontWeight: "800",
          textAlign: "center",
          width: "100%",
          whiteSpace: "nowrap",
          textOverflow: "hidden",
          overflow: "hidden",
        }}
      >
        Где и когда
      </Typography>
      <Grid container spacing={4} alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <Box position={"relative"} height={"300px"} width={"100%"}>
            <Image
              src={"/images/perm-swamp.jpg"}
              layout={"fill"}
              objectFit={"contain"}
              style={{ borderRadius: 8 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant={"h4"}> Где? </Typography>
          <Typography variant={"h6"} mt={2}>
            {" "}
            За городом в <strong>Пермском крае!</strong>{" "}
          </Typography>
          <Typography variant={"h6"}>
            {" "}
            Не будем говорить точный адрес, пока не подписали договор, но
            оставили небольшой намек ;){" "}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign={"end"}>
          <Typography variant={"h4"}> Когда? </Typography>
          <Typography variant={"h6"} mt={2}>
            <strong>22-23 июля 2023 года</strong>
          </Typography>
          <Typography variant={"h6"}>
            Мы будем рады, если вы приедете к нам на два дня. Разместим всех
            гостей на загородной базе отдыха в комфортных условиях.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box position={"relative"} height={"300px"} width={"100%"}>
            <Image
              src={"/images/calendar.jpg"}
              layout={"fill"}
              objectFit={"contain"}
              style={{ borderRadius: 8 }}
            />
          </Box>
        </Grid>
      </Grid>
      {/*<Box*/}
      {/*  height={"50vh"}*/}
      {/*  width={"99vw"}*/}
      {/*  position={"relative"}*/}
      {/*  overflow={"hidden"}*/}
      {/*  mt={2}*/}
      {/*>*/}
      {/*  <Image*/}
      {/*    src={ASSETS_URL + "bering.jpg"}*/}
      {/*    layout={"fill"}*/}
      {/*    objectFit={"cover"}*/}
      {/*    style={{ overflow: "hidden" }}*/}
      {/*  />*/}
      {/*</Box>*/}
    </Container>
  );
};

export default WhereAndWhenSection;
