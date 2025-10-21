"use client";

import { createContext, useContext, useState } from "react";

import type { UserContext, UserInfo } from "./types";
import { useAuthSession } from "./useAuthSession";

const Context = createContext<UserContext>({ user: null });

export function useAppContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
}

export function ContextProvider({ children, }: { children: React.ReactNode; }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useAuthSession((storageName, session) => {
    if (storageName === "session") {
      if (session && session.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    }
  });

  return (
    <Context.Provider value={{
      user,
    }}>
      {children}
    </Context.Provider>
  );
}