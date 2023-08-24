'use client';

// NOTE: https://mui.com/material-ui/guides/next-js-app-router/

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useServerInsertedHTML } from 'next/navigation';
import { useState, type ReactNode } from 'react';

import { ComputedTheme } from '@/enums/ComputedTheme';
import { useComputedTheme } from '@/stores/theme';

export type ThemeRegistryProps = {
  children: ReactNode
};

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const computedTheme = useComputedTheme();
  const theme = createTheme({
    palette: {
      mode: ComputedTheme.toString(computedTheme)
    }
  });
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'css' });

    cache.compat = true;

    const prevInsert = cache.insert;

    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];

      if (typeof cache.inserted[serialized.name] === 'undefined') {
        inserted.push(serialized.name);
      }

      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;

      inserted = [];

      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = '';

    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        dangerouslySetInnerHTML={{
          __html: styles
        }}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        key={cache.key}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
