export interface ThemeVariants {
  light: string;
  dark: string;
}

export interface ColorConfig {
  [key: string]: ThemeVariants;
}
