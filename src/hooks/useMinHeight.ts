import { useViewportHeight } from '@/hooks/useViewportHeight';

export const useMinHeight = (): string => {
  const vh = useViewportHeight();

  return (
    typeof vh === 'undefined'
      ? '100vh'
      : `${vh * 100}px`
  );
};
