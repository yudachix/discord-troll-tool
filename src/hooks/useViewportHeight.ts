import { useEffect, useState } from 'react';

export const useViewportHeight = (): number | undefined => {
  const [vh, setVh] = useState<number | undefined>();
  const handleResize = () => setVh(window.innerHeight * 0.01);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener('resize', handleResize, {
      signal: controller.signal
    });
    handleResize();

    return () => {
      controller.abort();
    };
  });

  return vh;
};
