import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import ShrekButton from "../../../components/ui/button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import usePageRedirect from "../../../utils/use-page-redirect";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { redirect } from "next/dist/server/api-utils";

const ProfileOnboarding = () => {
  const [guests, setGuests] = useState([
    {
      guestNum: 1,
      name: "",
      transfer: false,
    },
  ]);
  const [currentGuest, setCurrentGuest] = useState(0);

  const handleAddGuest = () => {
    let newGuests = [
      ...guests,
      {
        guestNum: guests.length + 1,
        name: "",
        transfer: false,
      },
    ];
    setGuests(newGuests);
  };

  const toProfile = usePageRedirect("/profile");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    let id = localStorage.getItem("id");
    let guestNum = 1;
    for (let guest of guests) {
      let response = await fetch(API_URL, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
          action: "addUser",
          id: id,
          guest_num: guestNum,
          name: guest.name,
          is_coming: 1,
        }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
      console.log(response);
      guestNum++;
    }
    setLoading(false);
    toProfile();
  };

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant={"h5"} textAlign={"center"}>
        {`Привет!\nМы просим тебя заполнить информацию о себе и, если ты придешь
              не один, о своих спутниках`}
      </Typography>
      <Typography variant={"subtitle1"} textAlign={"center"} py={2} mb={2}>
        {`Эту информацию можно будет изменить позже`}
      </Typography>
      {guests.map((guest, index) => (
        <Accordion
          disableGutters
          square
          key={guest.guestNum}
          expanded={index === currentGuest}
          onChange={() => setCurrentGuest(index)}
          elevation={10}
          sx={{
            mt: 2,
            width: { xs: "100%", md: "50%" },
            "&.MuiPaper-root": {
              background: (theme) => theme.palette.primary.background,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "&.Mui-expanded": {
                minHeight: "32px",
                height: "48px",
                py: 0,
              },
            }}
          >
            <Typography sx={{ width: "20%", flexShrink: 0 }}>
              {`Гость ${index + 1}`}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {guest.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              variant={"standard"}
              value={guest.name}
              label={"Имя и Фамилия"}
              onChange={(event) => {
                setGuests((prevValue) => {
                  return prevValue.map((value, indexValue) =>
                    indexValue === index
                      ? { ...value, name: event.target.value }
                      : value
                  );
                });
              }}
              sx={{ width: "100%" }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      <ShrekButton
        onClick={handleAddGuest}
        sx={{ mt: 4, px: 2, py: 1, width: { xs: "100%", md: "50%" } }}
      >
        Добавить гостя
      </ShrekButton>
      <ShrekButton
        onClick={handleSubmit}
        loading={loading}
        sx={{ mt: 2, px: 2, py: 1, width: { xs: "100%", md: "50%" } }}
      >
        Продолжить
      </ShrekButton>
    </Container>
  );
};

export default ProfileOnboarding;
