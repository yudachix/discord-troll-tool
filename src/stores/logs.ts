import { create } from 'zustand';

import type { LogLevel } from '@/enums/LogLevel';

import { noop } from '@/utils/noop';
import { setState, type SetState } from '@/utils/setState';

export type Log = {
  id: number,
  location: string,
  createdAt: Date,
  level: LogLevel,
  description: string
};

export type LogsStore = {
  logs: Log[],
  setLogs: SetState<Log[]>
};

export const initialLogsStore: LogsStore = {
  logs: [],
  setLogs: noop
};

export const useLogsStore = create<LogsStore>(set => ({
  ...initialLogsStore,
  setLogs: setState('logs', set)
}));
