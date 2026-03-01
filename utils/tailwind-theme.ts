import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--color-background": "#FFFFFF",
    "--color-surface": "#F1F1F1",

    "--color-primary": "#A9B5DF",
    "--color-secondary": "#2D336B",

    "--color-text-primary": "#121212",
    "--color-text-secondary": "#4B5563",
    "--color-text-on-primary": "#FFFFFF",

    "--color-outline": "#2A2A2A",
    "--color-outline-secondary": "#E1E1E1",
  }),
  dark: vars({
    "--color-background": "#121212",
    "--color-surface": "#161616",

    "--color-primary": "#2D336B",
    "--color-secondary": "#A9B5DF",

    "--color-text-primary": "#F1F1F1",
    "--color-text-secondary": "#FFFFFF",
    "--color-text-on-primary": "#2D336B",

    "--color-outline": "#2A2A2A",
    "--color-outline-secondary": "#171717",
  }),
};
