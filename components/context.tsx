"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
  expires: string | null;
  user: {
    name: string;
    email: string;
    image: string;
  } | null;
};

const Context = createContext<ContextType | null>(null);

export function useAppContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
}

export function ContextProvider({ children, }: { children: React.ReactNode; }) {
  return (
    <Context.Provider
      value={{
        expires: null,
        user: null,
      }}
    >
      {children}
    </Context.Provider>
  );
}