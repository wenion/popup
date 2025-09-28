"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useMessenger } from "./messenger";
import type { UserContext } from "./types";

const Context = createContext<UserContext>({expires: null, user: null});

export function useAppContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
}

export function ContextProvider({ children, }: { children: React.ReactNode; }) {
  const [value, setValue] = useState<UserContext>({ expires: null, user: null });

  const onAuthMessageUpdated = useCallback((message: any) => {
    if (message.type === "storage-changed" && message.name === "auth") {
      if (message.payload) {
        // Update context state expires and user
        setValue({
          expires: message.payload.expires,
          user: message.payload.user,
        });
      } else {
        setValue({ expires: null, user: null });
      }
    }
  }, []);

  const { isReady, sendMessage } = useMessenger(onAuthMessageUpdated);

  useEffect(() => {
    if (!isReady) return;
    // Initial fetch of auth state from storage
    sendMessage({ type: "get-storage", name: "auth" })
      .then((data) => {
        if (data) {
          onAuthMessageUpdated(data);
        }
      })
      .catch((err) => {
        console.error("Failed to get auth from storage:", err);
      });
  }, [isReady, sendMessage]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}