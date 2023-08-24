'use client';

import Stack from '@mui/material/Stack';
import useSize from '@react-hook/size';
import { useRef } from 'react';

import type { ReactNode } from 'react';

import Header from '@/components/app/layout/Header';
import ThemeRegistry from '@/components/app/layout/ThemeRegistry';
import { useMinHeight } from '@/hooks/useMinHeight';
import { useViewportHeight } from '@/hooks/useViewportHeight';

export type LayoutProps = {
  children: ReactNode
};

export default function Layout({ children }: LayoutProps) {
  const minHeight = useMinHeight();
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportHeight = useViewportHeight();
  const [, headerHeight] = useSize(headerRef, {
    initialHeight: 56,
    initialWidth: 0
  });
  const maxHeight = (
    typeof viewportHeight === 'undefined'
      ? `calc(100vh - ${headerHeight}px)`
      : `${viewportHeight * 100 - headerHeight}px`
  );


  return (
    <ThemeRegistry>
      <Stack
        minHeight={minHeight}
        sx={{
          color: 'text.primary',
          backgroundColor: 'background.paper'
        }}
      >
        <Header ref={headerRef} />
        <Stack flex={`1 1 ${maxHeight}`} maxHeight={maxHeight}>
          {children}
        </Stack>
      </Stack>
    </ThemeRegistry>
  );
}
