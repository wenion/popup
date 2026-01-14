import { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@heroui/button";

import MainLayout from "@/components/layout/MainLayout";
import { useAppContext } from "@/components/context";

export default function SignIn() {
  const { profile } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (profile) router.replace("/")
  }, [profile]);

  const onSignInClick = async() => {
    const base = process.env.NEXT_PUBLIC_HOMEPAGE!;

    const url = new URL("/login", base);

    url.searchParams.set("from", "extension");
    url.searchParams.set("ext", chrome.runtime.id);

    chrome.tabs.create({ url: url.href });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 px-8 py-4">
        <p className="text-sm text-gray-600">
          Your session has expired. Please sign in again to continue.
        </p>
        <Button size="sm" color="primary" onPress={onSignInClick}>
          Sign in
        </Button>
      </div>
    </MainLayout>
  );
}
