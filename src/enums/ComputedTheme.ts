import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import type SvgIcon from '@mui/material/SvgIcon';

export type ComputedTheme = ComputedTheme.Dark | ComputedTheme.Light;

export namespace ComputedTheme {
  export const Light = 0;
  export const Dark = 1;
  export type Light = typeof ComputedTheme.Light;
  export type Dark = typeof ComputedTheme.Dark;

  export const toString = (value: ComputedTheme) => {
    switch (value) {
      case ComputedTheme.Light: return 'light';
      case ComputedTheme.Dark: return 'dark';
    }
  };

  export const toIcon = (value: ComputedTheme): typeof SvgIcon => {
    switch (value) {
      case ComputedTheme.Light: return LightModeIcon;
      case ComputedTheme.Dark: return DarkModeIcon;
    }
  };
}
