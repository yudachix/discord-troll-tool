import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Tab } from '@/enums/Tab';
import { noop } from '@/utils/noop';

export type TabStore = {
  tab: Tab,
  setTab: (tab: Tab) => void
};

export const initialTabStore: TabStore = {
  tab: Tab.getDefault(),
  setTab: noop
};

export const useTabStore = create(
  persist<TabStore>(
    set => ({
      ...initialTabStore,
      setTab: tab => set({ tab })
    }),
    {
      name: 'tab',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => s => {
        const tab = s?.tab;

        useTabStore.setState({
          ...s,
          tab: Tab.isTab(tab) ? tab : initialTabStore.tab
        });
      }
    }
  )
);
