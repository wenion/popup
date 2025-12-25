import { Home } from "@/components/home";
import { SignIn } from "@/components/sign-in";
import { SiteAccessPrompt } from "@/components/site-access-prompt";
import { useAppContext } from "@/components/context";

export default function IndexPage() {
  const { profile, permissionGranted } = useAppContext();
  return (
    <div className="relative flex flex-col w-xs bg-white">
      {!profile && (<SignIn />)}
      {profile && !permissionGranted && (<SiteAccessPrompt />)}
      {profile && permissionGranted && (<Home />)}
    </div>
  );
}
