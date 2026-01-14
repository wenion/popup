import { useCallback } from "react";
import { useRouter } from "next/router";
import { Button } from "@heroui/button";

import { useAppContext } from "@/components/context";

export default function SiteAccessPrompt() {
  const router = useRouter();
  const { setPermissionGranted } = useAppContext();

  const handleGrantClick = useCallback(async () => {
    setPermissionGranted(true);
    router.replace("/");
  }, [setPermissionGranted, router]);

  const handleExitClick = useCallback(() => {
    router.replace("/");
  }, [router]);

  return (
    <main className="w-80 bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex flex-col items-center justify-between p-4 border-b border-black/5">
        <h2 className="text-xl font-semibold text-slate-900">
          Site access required
        </h2>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 px-8 py-4">
        <p className="flex text-xs text-slate-600 text-center">
          To capture traces, the extension needs permission for the current site.
        </p>
        <div className="flex flex-col gap-2 px-12">
          <Button size="sm" color="danger" onPress={handleGrantClick}>
            Grant access
          </Button>

          <Button size="sm" color="default" onPress={handleExitClick}>
            Not now
          </Button>
        </div>
        <div className="text-xs leading-snug text-slate-500 px-8 text-center">
          You can revoke site access anytime in Chrome Extension settings.
        </div>
      </div>
    </main>
  );
}
