import DarkModeIcon from '@mui/icons-material/DarkMode';
import DevicesIcon from '@mui/icons-material/Devices';
import LightModeIcon from '@mui/icons-material/LightMode';

import type SvgIcon from '@mui/material/SvgIcon';

export type Theme = typeof Theme.Dark | typeof Theme.Light | typeof Theme.System;

export namespace Theme {
  export const System = 0;
  export const Light = 1;
  export const Dark = 2;
  export type System = typeof Theme.System;
  export type Light = typeof Theme.Light;
  export type Dark = typeof Theme.Dark;

  export const getDefault = (): Theme => Theme.System;

  export const iterThemes = function* (): IterableIterator<Theme> {
    yield Theme.System;
    yield Theme.Dark;
    yield Theme.Light;
  };

  export const toString = (value: Theme): string => {
    switch (value) {
      case Theme.System: return 'system';
      case Theme.Light: return 'light';
      case Theme.Dark: return 'dark';
    }
  };

  export const toLabel = (value: Theme): string => {
    switch (value) {
      case Theme.System: return 'システム';
      case Theme.Light: return 'ライト';
      case Theme.Dark: return 'ダーク';
    }
  };

  export const toIcon = (value: Theme): typeof SvgIcon => {
    switch (value) {
      case Theme.System: return DevicesIcon;
      case Theme.Light: return LightModeIcon;
      case Theme.Dark: return DarkModeIcon;
    }
  };

  export const isTheme = (value: unknown): value is Theme => (
    value === Theme.System ||
    value === Theme.Light ||
    value === Theme.Dark
  );
}

