import { Home } from "@/components/home";
import { useAppContext } from "@/components/context";
import { SignIn } from "@/components/signin";

export default function IndexPage() {
  const { profile } = useAppContext();
  return (
    <div className="relative flex flex-col w-xs bg-white">
      {profile ? <Home /> : <SignIn />}
    </div>
  );
}
