import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { API_URL, LANDING_REFS } from "../../utils/consts";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";

const StatisticsSection = () => {
  const guests = useQuery("guests", () =>
    axios
      .get(API_URL, {
        params: { data: "users" },
      })
      .then((res) => res.data)
  );

  return (
    <Container
      maxWidth={"lg"}
      ref={LANDING_REFS.STATISTICS}
      sx={{
        mt: 10,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"top"}
            height={{ xs: "unset", md: "400px" }}
          >
            <Box>
              <Typography variant={"h6"} component={"span"}>
                {guests.isSuccess && `Зарегистрировано гостей: `}
              </Typography>
              <Typography variant={"h5"} component={"span"}>
                {guests.isSuccess && guests.data.length}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box width={"100%"} height={"400px"} position={"relative"}>
            <Image
              src={"/icons/shrek-face.png"}
              layout={"fill"}
              objectFit={"contain"}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatisticsSection;
