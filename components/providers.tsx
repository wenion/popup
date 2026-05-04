"use client";

import { MessageListener } from "./message-listener";
import { ContextProvider } from "@/components/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
  <ContextProvider>
    <MessageListener>{children}</MessageListener>
  </ContextProvider>
  );
}
