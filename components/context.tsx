"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { Profile, ExtensionJwtPayload } from "./types";

type ContextType = {
  profile: Profile | null;
  payload: ExtensionJwtPayload | null;
  captureOn: boolean | null;
  setCaptureOn: (value: boolean) => void;
}
const Context = createContext<ContextType | null>(null);

export function useAppContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
}

function decodeJwt(token: string): ExtensionJwtPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    return JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
  } catch {
    return null;
  }
}

function isTokenExpired(payload: ExtensionJwtPayload): boolean {
  const nowSec = Math.floor(Date.now() / 1000);
  return payload.exp <= nowSec;
}

export function ContextProvider({ children, }: { children: React.ReactNode; }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [payload, setPayload] = useState<ExtensionJwtPayload | null>(null);
  const [captureOn, _setCaptureOn] = useState<boolean | null>(null);

  const setCaptureOn = (value: boolean) => {
    chrome.storage.local.set({ captureOn: value });
  };

  useEffect(() => {
    chrome.storage.local.get("token", (result) => {
      const token = result.token;
      if (!token) return;

      const payload = decodeJwt(token);
      setPayload(payload);
    });

    chrome.storage.local.get("profile", (result) => {
      setProfile(result.profile);
    });

    chrome.storage.local.get("captureOn", (result) => {
      _setCaptureOn(result.captureOn ?? null);
    });

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "local" && changes.profile) {
        const newProfile = changes.profile.newValue;
        setProfile(newProfile);
      }
      if (areaName === "local" && changes.token) {
        const newToken = changes.token.newValue;

        const payload = decodeJwt(newToken);
        setPayload(payload);
      }
      if (areaName === "local" && changes.captureOn) {
        const newCaptureOn = changes.captureOn.newValue;
        _setCaptureOn(newCaptureOn);
      }
    });
  }, []);

  useEffect(() => {
    if (payload && isTokenExpired(payload)) {
      setProfile(null);
    }
  }, [payload]);

  useEffect(() => {
    if (captureOn === null) return;
    chrome.storage.local.set({ captureOn });
  }, [captureOn]);

  const value = useMemo<ContextType>(() => ({
      profile,
      payload,
      captureOn,
      setCaptureOn
    }), [profile, payload, captureOn, setCaptureOn]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
