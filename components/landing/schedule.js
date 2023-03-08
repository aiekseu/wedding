import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { LANDING_REFS } from "../../utils/consts";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

const ScheduleSection = () => {
  return (
    <Container
      maxWidth={"lg"}
      ref={LANDING_REFS.SCHEDULE}
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        mt: 8,
      }}
    >
      <Typography variant={"h2"}>Программа мероприятия</Typography>
      <Grid container direction={"row"} justifyContent={"space-between"} mt={4}>
        {/* 22 ИЮЛЯ*/}
        <Grid item xs={12} md={6} textAlign={"center"}>
          <Typography variant={"h5"}>22 июля</Typography>
          <Timeline position={"alternate"} sx={{ width: "100%" }}>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="subtitle1"
                color="text.secondary"
              >
                11:00
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  Трансфер из Перми
                </Typography>
                <Typography>Закажем автобус для иногородних гостей</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                variant="subtitle1"
                color="text.secondary"
              >
                14:00
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  Приезд и заселение
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                variant="subtitle1"
                color="text.secondary"
              >
                15:00-22:00
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  Лютый движ
                </Typography>
                <Typography>и конкурсы</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                variant="subtitle1"
                color="text.secondary"
              >
                22:00-06:00
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  Лютый движ
                </Typography>
                <Typography>с учётом закона тишины</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>

        {/* 23 ИЮЛЯ */}
        <Grid item xs={12} md={6} textAlign={"center"}>
          <Typography variant={"h5"}>23 июля</Typography>
          <Timeline position={"alternate"} sx={{ width: "100%" }}>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="subtitle1"
                color="text.secondary"
              >
                12:00
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  Загораем, купаемся и развлекаемся
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                variant="subtitle1"
                color="text.secondary"
              >
                18:00
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  Выселение и трансфер
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScheduleSection;
