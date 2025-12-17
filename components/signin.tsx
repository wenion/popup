import Image from "next/image";

export function SignIn() {
  const onSignInClick = () => {
    const base = process.env.NEXT_PUBLIC_HOMEPAGE!;

    const url = new URL("/login", base);
    url.searchParams.set("from", "extension");
    url.searchParams.set("ext", chrome.runtime.id);

    chrome.tabs.create({ url: url.href });
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
