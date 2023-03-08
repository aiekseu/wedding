import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import Stickers from "../ui/stickers";
import theme from "../../styles/theme";
import useIsMobile from "../../utils/use-is-mobile";

const HelloEverybody = () => {
  const isMobile = useIsMobile();

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        minHeight: "80vh",
        textAlign: "center",
        pb: 8,
      }}
    >
      <Typography
        variant={"h2"}
        mt={"3vh"}
        fontFamily={"'Montserrat Alternates', sans-serif"}
        fontWeight={400}
      >
        Дорогие друзья и близкие!
      </Typography>
      <Grid container alignItems={"top"} justifyContent={"space-between"}>
        <Grid item xs={12} md={8}>
          <Typography
            variant={"h5"}
            textAlign={"start"}
            fontFamily={"'Montserrat Alternates', sans-serif"}
            mt={4}
            sx={{ color: (theme) => theme.palette.secondary.text }}
          >
            Вы приглашены на нашу свадебную тусовку в стиле "Шрека" в 
            <strong>субботу, 22 июля 2023 года 🎉</strong>
          </Typography>
          <Typography
            variant={"h5"}
            textAlign={"start"}
            mt={4}
            fontFamily={"'Montserrat Alternates', sans-serif"}
            sx={{ color: (theme) => theme.palette.secondary.text }}
          >
            Вы знаете нас, мы необычные ребята. И наша свадьба тому
            подтверждение. Вы не увидите Таню в белом платье и не заставите Лёшу
            выкупать невесту в подъезде.
          </Typography>
          {isMobile && <Stickers />}
          <Typography
            variant={"h5"}
            textAlign={"start"}
            mt={4}
            fontFamily={"'Montserrat Alternates', sans-serif"}
            sx={{ color: (theme) => theme.palette.secondary.text }}
          >
            Наша свадьба будет полностью костюмированная. Поэтому мы приглашаем
            вас создать свой уникальный образ героя из киновселенной Шрека!{" "}
            {"\n\n"}Это будет <strong>легендарно!</strong>
            {"\n\n"}Вы можете стать Драконихой, печенькой, палачом - всё зависит
            от вашей фантазии!
          </Typography>
          <Typography
            variant={"h5"}
            textAlign={"start"}
            mt={4}
            fontFamily={"'Montserrat Alternates', sans-serif"}
            sx={{ color: (theme) => theme.palette.secondary.text }}
          >
            Пожалуйста, не стесняйтесь задавать вопросы, если у вас есть
            какие-либо сомнения в выборе костюма.
          </Typography>
          <Typography
            variant={"h5"}
            textAlign={"start"}
            mt={4}
            fontFamily={"'Montserrat Alternates', sans-serif"}
            sx={{ color: (theme) => theme.palette.secondary.text }}
          >
            Мы просим подтвердить свое присутствие и количество гостей, которые
            будут с вами. {"\n\n"}Как? Скоро расскажем!
          </Typography>
        </Grid>
        {!isMobile && (
          <Grid item xs={12} md={4}>
            <Stickers />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default HelloEverybody;
