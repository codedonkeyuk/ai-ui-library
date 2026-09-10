import type { JSX } from "react/jsx-runtime";

export interface ThemeVariants {
  light: string;
  dark: string;
}

export interface ColorConfig {
  [key: string]: ThemeVariants;
}

export interface ColorConfigGroup {
  [key: string]: {
    example: () => JSX.Element;
    properties: {
      [key: string]: ThemeVariants;
    };
  };
}
