import { createContext, useContext, useMemo } from "react";

type HeaderContextValue = {
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
};

const HeaderContext = createContext<HeaderContextValue | undefined>(undefined);

type HeaderContextProviderProps = {
  children?: React.ReactNode;
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
};

export function HeaderContextProvider({
  children,
  menuOpen,
  onMenuOpenChange,
}: HeaderContextProviderProps) {
  const value = useMemo(
    () => ({
      menuOpen: !!menuOpen,
      onMenuOpenChange: onMenuOpenChange ?? (() => {}),
    }),
    [menuOpen, onMenuOpenChange],
  );

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

export function useHeaderContext(): HeaderContextValue {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeaderContext was used outside of HeaderContext");
  }
  return context;
}
