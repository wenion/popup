import { useMemo } from "react";
import Image from "next/image";
import { Switch } from "@heroui/switch";

import { Header } from "@/components/header";
import { useAppContext } from "@/components/context";

export function Home() {
  const { profile, captureOn, setCaptureOn } = useAppContext();

  const notice = "Welcome";

  const userName = useMemo(() => {
    return profile?.full_name || null;
  }, [profile]);

  const avatarUrl = useMemo(() => {
    return profile?.avatar_url || null;
  }, [profile]);

  return (
    <div className={"w-full bg-white shadow-sm ring-1 ring-black/5"}>
      <Header />

      {/* Body */}
      <div className="flex gap-4 px-8 pt-4 items-center ">
        <div className="h-8 w-8 cursor-pointer">
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt={userName || "User"}
              className="object-cover rounded-full"
            />
          )}
        </div>
        <p className="text-lg font-medium text-slate-600 text-center">{notice}, {userName}!</p>
      </div>
      <div className="flex w-full pl-8 p-8">
        <Switch color="success" isSelected={!!captureOn} onValueChange={setCaptureOn} size="sm">
          {captureOn ? "Tracking On" : "Tracking Off"}
        </Switch>
      </div>
    </div>
  );
}
