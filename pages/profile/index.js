import React from "react";
import Image from "next/image";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { API_URL } from "../../utils/consts";
import axios from "axios";
import ShrekButton from "../../components/ui/button";
import usePageRedirect from "../../utils/use-page-redirect";

const ProfilePage = () => {
  // const costumes = useQuery("costumes", () =>
  //   axios.get(API_URL, { params: { data: "costumes" } }).then((res) => res.data)
  // );
  //
  // const guests = useQuery("guests", () =>
  //   axios
  //     .get(API_URL, {
  //       params: { data: "userById", id: localStorage.getItem("id") },
  //     })
  //     .then((res) => res.data)
  // );

  const toMain = usePageRedirect("/");

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <Typography variant={"h6"}>В разработке</Typography>
        <ShrekButton onClick={toMain}>На главную</ShrekButton>
      </Box>
    </>
  );
};

export default ProfilePage;
