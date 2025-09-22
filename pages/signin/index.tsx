
import Image from "next/image";
import DefaultLayout from "@/layouts/default";

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className="flex items-center">
      <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified wordmark + green dot */}
        <circle cx="16" cy="16" r="12" fill="#06b6d4" />
        {/* <rect x="40" y="8" width="96" height="16" rx="8" fill="#111827"/> */}
      </svg>
      <p>Trace Extension</p>
    </div>
  );
}

export default function DocsPage() {
  const notice = "Extension is active, but key features are missing.";

  return (
    <DefaultLayout>
      <div className={"w-full bg-white shadow-sm ring-1 ring-black/5"}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <div className="max-xl:hidden">
            <Image
              className="dark:invert"
              src="/trace_logo.svg"
              alt="Next.js logo"
              width={56}
              height={20}
              priority
            />
          </div>
          <p className="px-4 text-xs text-slate-600">Track, analyse, and understand your writing habits</p>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-8 pt-4">
          {/* Subtle brand banner */}
          <div className="rounded-lg bg-slate-50 px-2 py-2">
            <div className="flex items-start gap-2">
              {/* <BellIcon className="min-w-6 h-6" /> */}
              <p className="text-sm font-medium text-slate-600 text-center">{notice}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="inline-flex cursor-pointer w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-slate-900 hover:bg-slate-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
            >
              Sign in
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 py-2">
          <span className="text-xs text-slate-500">
            {"Don't have an account?"}
          </span>
          <button
            type="button"
            className={
              "flex px-1 text-xs text-slate-500 items-center justify-center bg-slate-100 border border-slate-400 rounded-sm hover:bg-slate-200 cursor-pointer"
            }
          >
            Sign up
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}
