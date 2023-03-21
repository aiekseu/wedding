import React, { useEffect } from "react";
import { LANDING_REFS } from "../../utils/consts";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import ShrekButton from "../ui/button";

const steps = [
  {
    label: "Присоединиться к телеграм каналу",
    description: "Вот по <strong>этой</strong> ссылке",
    button: "Присоединился",
  },
  {
    label:
      "Зарегистрироваться на этом сайте и подтвердить свое присутствие до 1 мая",
    description: `Или зарегистрировться просто так :)\nЧтобы создать аккаунт, нужно нажать на Шрека в правом верхнем углу, ввести номер телефона и указать кол-во гостей`,
    button: "Зарегистрировался",
  },
  {
    label: "Посмотреть Шрека",
    description: `До 01.04.2023`,
    button: "Посмотрел",
  },
  {
    label: "Посмотреть Шрека 2",
    description: "До 14.04.2023",
    button: "Посмотрел",
  },
  {
    label: "Посмотреть Шрека 3",
    description: `До 21.04.2023`,
    button: "Посмотрел",
  },
  {
    label: "Выбрать костюм в личном кабинете",
    description: `Гостей много, а героев в Шреке нет. Именно поэтому мы сделали крутую систему, чтобы в реальном времени смотреть, сколько каких героев придет к нам на свадьбу! Не переживайте, если кто-то уже "занял" вашего героя – так будет только интереснее :)\n
    В личном кабинете (в правом верхнем углу) есть карточка каждого гостя – там, в выпадающем списке нужно выбрать героя, в которого вы будете наряжаться. В телеграм канале (и, возможно, здесь) мы выложим примеры простых костюмов ;)`,
    button: "Определился",
  },
  {
    label: "Ждать новостей :)",
    description: ``,
    button: "Определился",
  },
];

const TodoSection = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedStep = parseInt(localStorage?.getItem("todoStep"));
      if (storedStep) setActiveStep(storedStep);
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    localStorage.setItem("todoStep", activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    localStorage.setItem("todoStep", activeStep - 1);
  };
  return (
    <Container
      maxWidth={"lg"}
      ref={LANDING_REFS.TODO}
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant={"h2"}>Список задач</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant={"h5"}>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              {step.label === "Присоединиться к телеграм каналу" ? (
                <Typography href={"https://t.me/+F-V91egllmY5NjRi"}>
                  Вот по{" "}
                  <strong
                    onClick={() =>
                      window.open("https://t.me/+F-V91egllmY5NjRi", "_blank")
                    }
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    этой
                  </strong>{" "}
                  ссылке
                </Typography>
              ) : (
                <Typography>{step.description}</Typography>
              )}
              <Box sx={{ mb: 2 }}>
                <div>
                  {activeStep < steps.length - 1 && (
                    <ShrekButton
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {step.button}
                    </ShrekButton>
                  )}
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Назад
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default TodoSection;
