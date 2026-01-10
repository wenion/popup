import { Button } from "@heroui/button";
import { Header } from "@/components/header";

export function SignIn() {
  const onSignInClick = async() => {
    const base = process.env.NEXT_PUBLIC_HOMEPAGE!;

    const url = new URL("/login", base);
    url.searchParams.set("from", "extension");
    url.searchParams.set("ext", chrome.runtime.id);

    chrome.tabs.create({ url: url.href });
  };

  return (
    <div className={"w-full bg-white shadow-sm ring-1 ring-black/5"}>
      <Header />

      {/* Body */}
      <div className="flex flex-col gap-4 px-8 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            Your session has expired. Please sign in again to continue.
          </p>
          <Button size="sm" color="primary" onPress={onSignInClick}>Sign in</Button>
        </div>
      </div>
    </div>
  );
}
