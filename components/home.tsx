import { useMemo } from "react";
import getConfig from "next/config";
import Image from "next/image";

import { useAppContext } from "@/components/context";

export function Home() {
  const { user } = useAppContext();

  const notice = "Welcome";
  const { publicRuntimeConfig } = getConfig();
  const homepage = new URL(publicRuntimeConfig.homepage);

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
    if (user && user.email) {
      const username = user.email.split("@")[0];
      const first = username.split(/[._\s-]+/)[0];
      return first.charAt(0).toUpperCase() + first.slice(1);
    }
    return "";
  }, [user]);

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
