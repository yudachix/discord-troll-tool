import type { StateCreator } from 'zustand';

export type SetStateAction<T> = (prev: T) => T;
export type SetState<T> = (arg: SetStateAction<T> | T) => void;

export const setState = <T, K extends keyof T>(key: K, set: Parameters<StateCreator<T>>[0]): SetState<T[K]> => (
  arg => {
    set(prev => {
      const state: Partial<T> = {};

      if (typeof arg === 'function') {
        state[key] = (arg as SetStateAction<T[K]>)(prev[key]);
      } else {
        state[key] = arg;
      }

      return state;
    });
  }
);
