import React, { createContext, useState, useMemo } from 'react';

export interface IUpdateContext {
  shouldUpdate: number;
  setUpdate: () => void;
}

export const UpdateContext = createContext<IUpdateContext>({
  shouldUpdate: 0,
  setUpdate: () => {},
});

export function UpdateProvider({ children }: { children: React.ReactNode }) {
  const [shouldUpdate, setShouldUpdate] = useState(0);
  const setUpdate = () => setShouldUpdate((prev) => prev + 1);

  const updateContextValue = useMemo(
    () => ({ shouldUpdate, setUpdate }),
    [shouldUpdate],
  );

  return <UpdateContext.Provider value={updateContextValue}>{children}</UpdateContext.Provider>;
}
