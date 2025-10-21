"use client";

import { useEffect, useState } from "react";

export function useAuthSession(
  onChange?: (storageName: string, session: any) => void
) {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    chrome.storage.sync.get("session", (result) => {
      setSession(result.session);
      onChange?.("session", result.session);
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "sync" && changes.session) {
        setSession(changes.session.newValue);
        onChange?.("session", changes.session.newValue);
      }
    });
  }, []);

  return session;
}
