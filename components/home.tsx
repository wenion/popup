import Image from "next/image";

export function Home({username}: {username: string}) {
  const notice = "Welcome";

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
            <p className="text-lg font-medium text-slate-600 text-center">{notice}, {username}!</p>
          </div>
        </div>
      </div>
      <div className="h-12 w-full"/>
    </div>
  );
}
