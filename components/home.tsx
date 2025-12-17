import { useMemo } from "react";
import Image from "next/image";

import { useAppContext } from "@/components/context";

export function Home() {
  const { profile, captureOn, setCaptureOn } = useAppContext();

  const notice = "Welcome";
  const homepage = new URL(process.env.NEXT_PUBLIC_HOMEPAGE!);

  const onHomeClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        if (tab.url === homepage.href) {
          window.close(); // closes the popup
          return;
        }
        chrome.tabs.create({ url: homepage.href });
      }
    });
  };

  const userName = useMemo(() => {
    return profile?.full_name || null;
  }, [profile]);

  const avatarUrl = useMemo(() => {
    return profile?.avatar_url || null;
  }, [profile]);

  const toggleSwitch = () => {
    if (captureOn === null) {
      setCaptureOn(true);
      return;
    }

    const next = !captureOn;
    setCaptureOn(next);
  };

  return (
    <div className={"w-full bg-white shadow-sm ring-1 ring-black/5"}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
        <Image
          className="dark:invert"
          src="trace_logo.svg"
          alt="Next.js logo"
          width={56}
          height={20}
          priority
          unoptimized
        />
        <p className="px-4 text-xs text-slate-600">Track, analyse, and understand your writing habits</p>
        {/* Avatar */}
        <div className="flex h-8 w-8 rounded-full items-center justify-between">
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt={userName || "User"}
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 px-8 pt-4">
        {/* Subtle brand banner */}
        <div className="rounded-lg bg-slate-50 px-2 py-2">
          <div className="flex items-start gap-2 items-center justify-center">
            {/* <BellIcon className="min-w-6 h-6" /> */}
            <p className="text-lg font-medium text-slate-600 text-center">{notice}, {userName}!</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full pt-4">
        <button
          type="button"
          onClick={toggleSwitch}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer
            ${captureOn ? "bg-emerald-600" : "bg-slate-900"}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
              ${captureOn ? "translate-x-6" : "translate-x-1"}
            `}
          />
        </button>
        <span className="ml-3 text-sm font-medium text-slate-700">{captureOn ? "Tracking On" : "Tracking Off"}</span>
      </div>
      <div className="flex py-2 items-center justify-center h-20 w-full">
        <button
          type="button"
          className="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold bg-slate-900 hover:bg-slate-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
          onClick={onHomeClick}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
