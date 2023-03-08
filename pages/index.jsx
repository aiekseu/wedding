import React from "react";
import Head from "next/head";
import ShrekSomebody from "../components/ui/shrek-somebody";
import HelloEverybody from "../components/landing/hello-everybody";
import NavBar from "../components/ui/nav-bar";
import WhereAndWhenSection from "../components/landing/where-and-when";
import ScheduleSection from "../components/landing/schedule";
import TodoSection from "../components/landing/todo";
import StatisticsSection from "../components/landing/statistics";
import InspirationSection from "../components/landing/inspiration";
import SignInDialog from "../components/ui/sign-in-modal";
import { useCallback, useState } from "react";
import { Box } from "@mui/material";

const Home = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const handleCloseSignIn = useCallback(() => setSignInOpen(false));
  const handleOpenSignIn = useCallback(() => setSignInOpen(true));

  return (
    <>
      <Head>
        <title>Свадьба на болоте</title>
      </Head>
      <NavBar handleOpenSignIn={handleOpenSignIn} />
      <main>
        <ShrekSomebody />
        <HelloEverybody />
        <Box sx={{ backgroundColor: "#dddecd" }}>
          <WhereAndWhenSection />
          <Box
            sx={{
              backgroundImage:
                "linear-gradient(to right, rgba(221,222,205,0.92) 0 100%), url(https://i.pinimg.com/originals/1b/ef/4e/1bef4ee2971f501a6af4232188465b59.jpg)",
              backgroundRepeat: "repeat repeat",
              backgroundSize: "20%",
              opacity: 1,
            }}
          >
            <ScheduleSection />
          </Box>
          <TodoSection />
          <StatisticsSection />
          {/*<InspirationSection />*/}
        </Box>
      </main>
      <SignInDialog open={signInOpen} handleClose={handleCloseSignIn} />
    </>
  );
};

export default Home;
