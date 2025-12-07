import getConfig from "next/config";
import Image from "next/image";

export function SignIn() {
  const { publicRuntimeConfig } = getConfig();
  const loginPage = new URL(publicRuntimeConfig.loginPage);

  const onSignInClick = () => {
    chrome.storage.sync.set({ session: null});
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        if (tab.url === loginPage.href) {
          window.close(); // closes the popup
          return;
        }
        chrome.tabs.create({ url: loginPage.href });
      }
    });
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
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-8 py-4">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="inline-flex cursor-pointer w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-slate-900 hover:bg-slate-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
              onClick={onSignInClick}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
  );
}
