import useMediaQuery from '@mui/material/useMediaQuery';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ComputedTheme } from '@/enums/ComputedTheme';
import { Theme } from '@/enums/Theme';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { noop } from '@/utils/noop';
import { setState, type SetState } from '@/utils/setState';

export type ThemeStore = {
  theme: Theme,
  setTheme: SetState<Theme>
};

export const initialThemeStore: ThemeStore = {
  theme: Theme.getDefault(),
  setTheme: noop
};

export const useThemeStore = create(
  persist<ThemeStore>(
    set => ({
      ...initialThemeStore,
      setTheme: setState('theme', set)
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => s => {
        const theme = s?.theme;

        useThemeStore.setState({
          ...s,
          theme: Theme.isTheme(theme) ? theme : initialThemeStore.theme
        });
      }
    }
  )
);

export const useComputedTheme = (): ComputedTheme => {
  const { theme } = useHydratedStore(useThemeStore, initialThemeStore);
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)');

  switch (theme) {
    case Theme.Light: return ComputedTheme.Light;
    case Theme.Dark: return ComputedTheme.Dark;
    default: return prefersLight ? ComputedTheme.Light : ComputedTheme.Dark;
  }
};
