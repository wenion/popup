// useMessenger.ts
"use client";

import { useCallback, useEffect, useMemo } from "react";

type AnyMsg = { type: string; [k: string]: any };

export function useMessenger(
  onMessage?: (message: AnyMsg, sender?: chrome.runtime.MessageSender) => void
) {
  const runtime = useMemo(
    () =>
      typeof window !== "undefined" ? (window as any).chrome?.runtime ?? null : null,
    []
  );
  const isReady = !!runtime?.id;

  // Promise-based send to background service worker
  const sendMessage = useCallback(
    <T = unknown,>(message: AnyMsg): Promise<T> =>
      new Promise<T>((resolve, reject) => {
        if (!runtime?.id) {
          reject(new Error("chrome.runtime is not available"));
          return;
        }
        try {
          runtime.sendMessage(message, (response: T) => {
            const err = (window as any).chrome?.runtime?.lastError;
            if (err) return reject(new Error(err.message));
            resolve(response);
          });
        } catch (e) {
          reject(e as Error);
        }
      }),
    [runtime]
  );

  // Optional: long-lived Port for streaming/continuous messages
  const connect = useCallback(
    (name?: string) => {
      if (!runtime?.id) return null;
      try {
        const port = runtime.connect({ name });
        return port as chrome.runtime.Port;
      } catch {
        return null;
      }
    },
    [runtime]
  );

  // Incoming messages (from background or content scripts)
  useEffect(() => {
    if (!runtime || !onMessage) return;
    const handler = (message: AnyMsg, sender: chrome.runtime.MessageSender) => {
      onMessage(message, sender);
    };
    runtime.onMessage.addListener(handler);
    return () => runtime.onMessage.removeListener(handler);
  }, [runtime, onMessage]);

  return { isReady, sendMessage, connect };
}
