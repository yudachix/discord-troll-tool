import { useEffect, useState } from 'react';

import type { StoreApi, UseBoundStore } from 'zustand';

export const useHydratedStore = <T>(
  useStore: UseBoundStore<StoreApi<T>>,
  initialStore: T,
  validator: (store: T) => T = s => s
): T => {
  const store = useStore();
  const [hydratedStore, setHydratedStore] = useState<T>(validator(initialStore));

  useEffect(() => {
    setHydratedStore(validator(store));
  }, [store]);

  return hydratedStore;
};
