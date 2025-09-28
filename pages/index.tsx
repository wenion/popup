import { useAppContext } from "@/components/context";
import { SignIn } from "@/components/signin";
import { Home } from "@/components/home";

export default function IndexPage() {
  const { user } = useAppContext();

  return (
    <div className="relative flex flex-col w-xs bg-white">
      {user && user.name ? <Home username={user.name} /> : <SignIn />}
    </div>
  );
}
