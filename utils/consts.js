import React from "react";

export const LANDING_REFS = {
  WHERE_AND_WHEN: React.createRef(null),
  SCHEDULE: React.createRef(null),
  STATISTICS: React.createRef(null),
  TODO: React.createRef(null),
  INSPIRATION: React.createRef(null),
};

export const LANDING_SECTIONS = [
  { label: "Где и когда", ref: LANDING_REFS.WHERE_AND_WHEN },
  { label: "Программа мероприятия", ref: LANDING_REFS.SCHEDULE },
  { label: "TODO", ref: LANDING_REFS.TODO },
  { label: "Статистика", ref: LANDING_REFS.STATISTICS },
  // { label: "Помощь и вдохновение", ref: LANDING_REFS.INSPIRATION },
];

export const API_URL =
  "https://script.google.com/macros/s/AKfycbzvDBFj830bsd-9hKtBHe7CahPdd6uwl_3ibjViB7DiPcBFoutXvjnjAIcu09zo_NZDAA/exec";

export const ASSETS_URL = "https://storage.yandexcloud.net/wedding-assets/";
