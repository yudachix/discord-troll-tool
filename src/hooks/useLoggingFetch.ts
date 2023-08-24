import { useLogger } from '@/hooks/useLogger';

export const useLoggingFetch = () => {
  const logger = useLogger();

  return async (...args: Parameters<typeof fetch>) => {
    try {
      const res = await fetch(...args);
      const s = `${args[1]?.method ?? 'GET'} ${res.status} ${res.url}`;

      if (res.ok) {
        logger.debug(s, 'http');
      } else {
        logger.error(s, 'http');
      }

      return res;
    } catch (err) {
      logger.error('Failed to fetch', 'http');

      throw err;
    }
  };
};
