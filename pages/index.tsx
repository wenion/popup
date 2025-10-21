import { SignIn } from "@/components/signin";
import { Home } from "@/components/home";
import { useAppContext } from "@/components/context";

export default function IndexPage() {
  const { user } = useAppContext();

  return (
    <div className="relative flex flex-col w-xs bg-white">
      {user ? <Home /> : <SignIn />}
    </div>
  );
}
