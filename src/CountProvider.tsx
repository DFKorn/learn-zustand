import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { createStore, useStore, type StoreApi } from "zustand";

type CountStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const CountContext = createContext<StoreApi<CountStore> | undefined>(undefined);

type CountProviderProps = PropsWithChildren & {
  initialCount: number;
};

export default function CountProvider({
  children,
  initialCount,
}: CountProviderProps) {
  const [store] = useState(() =>
    createStore<CountStore>((set) => ({
      count: initialCount,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }))
  );

  return (
    <CountContext.Provider value={store}>{children}</CountContext.Provider>
  );
}

export function useCountStore<T>(selector: (state: CountStore) => T) {
  const context = useContext(CountContext);

  if (!context) {
    throw new Error("useCounterStore must be used within a CountProvider");
  }
  return useStore(context, selector);
}
