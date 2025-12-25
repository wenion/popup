import { Button } from "@heroui/button";
import { Logo } from "@/components/logo";

export function Header() {
  const homepage = new URL(process.env.NEXT_PUBLIC_HOMEPAGE!);

  const onHomeClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        if (tab.url === homepage.href) {
          window.close();
          return;
        }
        chrome.tabs.create({ url: homepage.href });
      }
    });
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
      <Button isIconOnly onPress={onHomeClick} className="bg-transparent">
        <Logo size={36} />
      </Button>
      <p className="px-4 text-xs text-slate-600">Track, analyse, and understand your writing habits</p>
    </div>
  );
}
