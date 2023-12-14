import { PaletteOptions } from "@mui/material/styles/createPalette";
import { ShadowInterface, SizingInterface, SpaceInterface } from "./types";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Theme } from "@mui/material";

const commonShadow = "0px 2px 4px rgba(0, 0, 0, 0.2)";
/* const commonOverrides = {
  root: {
    fontSize: 15,
    fontWeight: 600,
  },
  sizeSmall: {
    fontSize: 12,
    fontWeight: 600,
  },
  sizeLarge: {
    fontSize: 18,
    fontWeight: 600,
  },
};
 */
export const lightThemePalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#fff",
  },
};

export const darkThemePalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#fff",
  },
};

export const typography: TypographyOptions = {
  fontFamily: ["Roboto", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Arial", "sans-serif"].join(","),
  fontSize: 15,
  h4: {
    fontWeight: 700,
  },
  h5: {
    fontWeight: 600,
  },
  h6: {
    fontWeight: 500,
  },
  body1: {
    fontWeight: 400,
  },
  body2: {
    fontWeight: 400,
  },
  subtitle1: {
    fontWeight: 600,
  },
  subtitle2: {
    fontWeight: 400,
  },
  caption: {
    fontWeight: 400,
  },
};

/* export const radius: Theme["shape"] = {
  borderRadius: 6,
}; */

export const lightThemeShadows: ShadowInterface = {
  downward: `${commonShadow}, 0px 4px 8px rgba(0, 0, 0, 0.1)`,
  neutral: commonShadow,
  upward: `${commonShadow}, 0px -4px 8px rgba(0, 0, 0, 0.1)`,
};

export const darkThemeShadows: ShadowInterface = {
  downward: `${commonShadow}, 0px 4px 8px rgba(0, 0, 0, 0.4)`,
  neutral: commonShadow,
  upward: `${commonShadow}, 0px -4px 8px rgba(0, 0, 0, 0.4)`,
};

export const space: SpaceInterface = {
  none: "0px",
  xxs: "2px",
  xs: "4px",
  s_nudge: "6px",
  s: "8px",
  m_nudge: "10px",
  m: "12px",
  l: "16px",
  xl: "20px",
  xxl: "24px",
  xxxl: "32px",
};

export const sizing: SizingInterface = {
  tiny: (theme: Theme) => theme.spacing(4),
  small: (theme: Theme) => theme.spacing(8),
  standard: (theme: Theme) => theme.spacing(16),
  medium: (theme: Theme) => theme.spacing(24),
  large: (theme: Theme) => theme.spacing(32),
  xlarge: (theme: Theme) => theme.spacing(48),
  xxlarge: (theme: Theme) => theme.spacing(64),
  custom: (theme: Theme) => theme.spacing(80),
};

/* export const components: ThemeOptions["components"] = {
  MuiTab: {
    styleOverrides: commonOverrides,
  },
  MuiButton: {
    styleOverrides: commonOverrides,
  },
};
 */
