import { LogLevel } from '@/enums/LogLevel';
import { Tab } from '@/enums/Tab';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { useLogsStore } from '@/stores/logs';
import { useTabStore, initialTabStore } from '@/stores/tab';

export const useLogger = () => {
  const { tab } = useHydratedStore(useTabStore, initialTabStore);
  const { setLogs } = useLogsStore();
  const createLogger = (level: LogLevel) => {
    return (description: string, subLocation?: string): void => {
      setLogs(logs => [
        ...logs,
        {
          id: Math.random(),
          level,
          createdAt: new Date(),
          location: subLocation ? `${Tab.toString(tab)}:${subLocation}` : Tab.toString(tab),
          description
        }
      ]);
    };
  };

  return {
    debug: createLogger(LogLevel.Debug),
    info: createLogger(LogLevel.Info),
    warn: createLogger(LogLevel.Warn),
    error: createLogger(LogLevel.Error)
  };
};
