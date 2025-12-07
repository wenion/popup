"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { UserContext, UserInfo } from "./types";

const Context = createContext<UserContext | null>(null);

export function useAppContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
}

export function ContextProvider({ children, }: { children: React.ReactNode; }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    chrome.storage.sync.get("session", (result) => {
      const raw = result.session;
      if (!raw) setUser(null);

      let session = raw;
      if (typeof raw === "string") {
        try {
          session = JSON.parse(raw);
        } catch (e) {
          console.error("Invalid session JSON:", raw, e);
          return;
        }
      }
      if (session && session.user) setUser(session.user);
      else setUser(null);
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "sync" && changes.session) {
        const raw = changes.session.newValue;
        if (!raw) setUser(null);

        let session = raw;
        if (typeof raw === "string") {
          try {
            session = JSON.parse(raw);
          } catch (e) {
            console.error("Invalid session JSON:", raw, e);
            return;
          }
        }
        if (session && session.user) setUser(session.user);
        else setUser(null);
      }
    });
  }, []);

  const value = useMemo<UserContext>(
    () => {
      return{
      user: user,
    }},
    [user]
  );

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
